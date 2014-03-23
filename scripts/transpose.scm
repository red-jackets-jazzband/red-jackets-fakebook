#! /usr/local/bin/scm \ %0 %*
- !#
;;;;"transpose" Transpose ABC-format music into any key.
;;; Copyright 1998-1999, 2011 Aubrey Jaffer
;
;Permission to copy this software, to modify it, to redistribute it,
;to distribute modified versions, and to use it for any purpose is
;granted, subject to the following restrictions and understandings.
;
;1.  Any copy made of this software must include this copyright notice
;in full.
;
;2.  I have made no warranty or representation that the operation of
;this software will be error-free, and I am under no obligation to
;provide any services, by way of maintenance, update, or otherwise.
;
;3.  In conjunction with products arising from the use of this
;material, there shall be no use of my name in any advertising,
;promotional, or sales literature without prior written consent in
;each case.

(require 'common-list-functions)
(require 'string-search)
(require 'line-i/o)

(define (transpose.script args)
  (cond ((<= 2 (length args) 3) (apply transpose args) #t)
	((and (= 1 (length args)) (string-ci=? "--help" (car args)))
	 (transpose.usage) #t)
	(else (transpose.usage))))

(define (ts . args) (transpose.script args))

(define (transpose.usage)
  (display "\
\
Usage: transpose N SOURCE.abc [DESTINATION.abc]
       transpose KEY SOURCE.abc [DESTINATION.abc]
\
  - Transpose ABC-format music by interval N.
  - Transpose ABC-format melodies for KEY instrument.

  If DESTINATION.abc is not supplied, output is written to standard output.

  When interval N is a positive or negative integer (with no `.'), transpose
  the melodies and chords upward or downward (respectively) by N semi-tones.
  Fractions and numbers with decimal points specify `musical intervals':

  Intervals  Semi-tones                 Intervals  Semi-tones
  -1/2  -2.     -2                      1/12  12.     19
  -1/3  -3.     -4                      1/11  11.     17
  -1/4  -4.     -5                      1/10  10.     16
  -1/5  -5.     -7                      1/9   9.      14
  -1/6  -6.     -9                      1/8   8.      12 (1 Octave higher)
  -1/7  -7.     -11                     1/7   7.      11
  -1/8  -8.     -12 (1 Octave lower)    1/6   6.      9
  -1/9  -9.     -14                     1/5   5.      7
  -1/10 -10.    -16                     1/4   4.      5
  -1/11 -11.    -17                     1/3   3.      4
  -1/12 -12.    -19                     1/2   2.      2

  KEY may be A through G, optionally followed by sharp (#) or flat (b).
  For example, \"transpose Bb Reveille.abc\" will produce ABC script with
  notes appearing two semitones higher than in Reveille.abc.

  Transpose strips out guitar-chords and turns lyrics into comments when
  transposing for KEYed instruments.  It may sometimes be neccessary to
  \"transpose +12\" or \"transpose -12\" the result of transposing for an
  instrument.

               http://Voluntocracy.org/Transpose.html
"
	   (current-error-port))
  #f)

(define *abc-input-port* (current-input-port))
(define *abc-output-port* (current-output-port))
(define original-sharp-table #f)
(define transpose-shift #f)
(define transposed-sharp-table #f)
(define transpose-pitch-delta #f)
(define transpose-guitar? #f)
(define preserve-guitar? #f)
(define preserve-words? #f)
(define transpose-escape #f)

(define *http:byline*
  "ABC Music <A HREF=http://voluntocracy.org/Music/Transpose.html>Transpose</A> server")

(define (transpose-error . args)
  (if (or *script* (not transpose-escape))
      (apply slib:error args)
      (transpose-escape
       (append (list (car args) (cadr args))
	       (map (lambda (arg) (string-append "<br>" arg))
		    (cddr args))))))

(define (transpose int/key . args)
  (cond ((string->number int/key) =>
	 (lambda (interval) (apply transpose-by interval args)))
	(else
	 (apply transpose-for int/key args))))

(define (transpose-by interval . optargs)
  (set! transpose-pitch-delta (interval->pitch-delta interval))
  (set! transpose-guitar? #t)
  (set! preserve-guitar? #t)
  (set! preserve-words? #t)
  (process-file-args optargs))

(define (transpose-for instrument-key . optargs)
  (set! transpose-pitch-delta
	(sym:mod (- (key->pitch "C") (key->pitch instrument-key)) 12))
  (set! transpose-guitar? #f)
  (set! preserve-guitar? #f)
  (set! preserve-words? #f)
  (process-file-args optargs))

(define (process-file-args optargs)
  (cond
   ((null? optargs) (newline) (process-abc-input))
   (else
    (let ((basename (car optargs)))
      (define (process iport)
	(set! *abc-input-port* iport)
	(cond
	 ((null? optargs) (newline) (process-abc-input))
	 (else
	  (let ((outname (car optargs)))
	    (if (not (or (output-port? outname) (substring? "." outname)))
		(set! outname (string-append outname ".abc")))
	    (cond ((string? outname)
		   (call-with-output-file
		       outname
		     (lambda (oport)
		       (set! *abc-output-port* oport)
		       (process-abc-input))))
		  (else
		   (set! *abc-output-port* outname)
		   (process-abc-input)))))))
      (set! optargs (cdr optargs))
      (if (string? basename)
	  (call-with-input-file
	      (if (file-exists? (string-append basename ".abc"))
		  (string-append basename ".abc")
		  basename)
	    process)
	  (process basename))))))

;;; The interval idea (seconds, thirds, ...) breaks down at the fifteenth,
;;; which is actually 2 octaves!  So much for medieval mathematics.

(define (interval->half-steps int)
  (cond ((eqv? 1 int) int)
	(else
	 (set! int (max 0 (+ -1 int)))
	 (+ (vector-ref major (modulo int 7))
	    (* 12 (quotient int 7))))))

(define (interval->pitch-delta obj)
  (if (not (number? obj))
      (transpose-error
       406 "Interval is not number: " (object->string obj)))
  (* (if (negative? obj) -1 1)
     (let ((num (abs obj)))
       (cond ((exact? num) num)
	     ((and (positive? num) (<= num 1.0))
	      (interval->half-steps (inexact->exact (/ num))))
	     (else
	      (interval->half-steps (inexact->exact num)))))))

(define (process-abc-input)
  (do ((line (read-line *abc-input-port*) (read-line *abc-input-port*)))
      ((eof-object? line))
    (transpose-line line)
    (newline *abc-output-port*)))

(define (transpose-line line)
  (let ((len (string-length line)))
    (cond
      ((<= 0 len 1) (transpose-measures line))
      ((eqv? #\# (string-ref line 0))
       (display line *abc-output-port*))
      (else
       (case (string-ref line 1)
	 ((#\:)
	  (case (string-ref line 0)
	    ((#\W #\w)
	     (cond ((not preserve-words?) (display #\% *abc-output-port*)))
	     (display line *abc-output-port*))
	    ((#\K)
	     (let* ((key-start
		     (do ((ks 2 (+ 1 ks)))
			 ((or (>= ks len)
			      (not (char-whitespace? (string-ref line ks))))
			  ks)))
		    (key-str (substring line key-start len))
		    (key-end (case (and (> (string-length key-str) 1)
					(string-ref key-str 1))
			       ((#\# #\b) 2)
			       (else 1)))
		    (mode-start
		     (do ((ks key-end (+ 1 ks)))
			 ((or (>= ks (- len key-start))
			      (not (char-whitespace? (string-ref key-str ks))))
			  ks)))
		    (mode (substring key-str key-end (- len key-start)))
		    (mode-tab (string->mode mode))
		    (modeless-key (substring key-str 0 key-end))
		    (transposed-key
		     (pitch->keys (+ (key->pitch modeless-key)
				     transpose-pitch-delta))))
	       (set! original-sharp-table
		     (make-sharp-table modeless-key mode-tab))
	       (set! transposed-sharp-table
		     (map (lambda (key) (make-sharp-table key mode-tab))
			  transposed-key))
	       (cond ((or (= 1 (length transposed-key))
			  (<= (acc-cnt (car transposed-sharp-table))
			      (acc-cnt (cadr transposed-sharp-table))))
		      (set! transposed-key (car transposed-key))
		      (set! transposed-sharp-table
			    (car transposed-sharp-table)))
		     (else (set! transposed-key (cadr transposed-key))
			   (set! transposed-sharp-table
				 (cadr transposed-sharp-table))))
	       (let ((letter-shift
		      (- (string-index "CDEFGAB" (string-ref transposed-key 0))
			 (string-index "CDEFGAB" (string-ref modeless-key 0)))))
		 (set! transpose-shift
		       (+ letter-shift
			  (if (negative? (* letter-shift transpose-pitch-delta))
			      (if (negative? letter-shift) 7 -7)
			      0)
			  (* 7 (quotient transpose-pitch-delta 12)))))
	       (display (substring line 0 key-start) *abc-output-port*)
	       (display transposed-key *abc-output-port*)
	       (display mode *abc-output-port*)))
	    ((#\| #\:) (transpose-measures line))
	    (else (display line *abc-output-port*))))
	 (else (transpose-measures line)))))))

(define (acc-cnt mode)
  (abs (apply + (vector->list mode))))

;;;; Modes and Keys

(define major '#(0 2 4 5 7 9 11))
(define minor '#(0 2 3 5 7 8 10))

(define (sym:mod num mod)
  (- (modulo (+ (quotient mod 2) num)
	     mod)
     (quotient mod 2)))

(define (make-sharp-table tonic mode)
  (define key-sig (make-vector (vector-length mode) #f))
  (define tonic-pitch (key->pitch tonic))
  (do ((note (string-index "CDEFGAB" (string-ref tonic 0))
	     (modulo (+ 1 note) 7))
       (idx 0 (+ 1 idx)))
      ((>= idx (vector-length mode)))
    (vector-set! key-sig note
		 (sym:mod (- (+ (vector-ref mode idx) tonic-pitch)
			     (vector-ref major (modulo note 7)))
			  12)))
  key-sig)

(define (string->mode str)
  (define ans #f)
  (for-each (lambda (mod offset)
	      (cond (ans)
		    ((substring-ci? mod str)
		     (set! ans offset))))
	    '("mix" "dor" "phr" "lyd" "loc" "maj" "ion" "aeo" "min" "m")
	    '(-1     -1    -2   1      -3    0     0     -2   -2    -2))
  (if (or (not ans) (eqv? 0 ans)) major
      (let ((lst (vector->list major)))
	(list->vector
	 (let* ((nlst
		 (if (negative? ans)
		     (append (last lst (- ans)) (butlast lst (- ans)))
		     (append (nthcdr ans lst) (butnthcdr ans lst))))
		(nlst0 (car nlst)))
	   (map (lambda (pitch) (modulo (- pitch nlst0) 12)) nlst))))))

(define (key->pitch key)
  (+ (or (string-index "CCDDEFFGGAAB" (string-ref key 0))
	 (transpose-error 406 "Strange key: " key))
     (key->acc key)))

(define (pitch->keys idx)
  (define ans '())
  (for-each (lambda (kchr)
	      (for-each (lambda (achr)
			  (define kstr (if achr
					   (string kchr achr)
					   (string kchr)))
			  (if (eqv? (modulo idx 12)
				    (modulo (key->pitch kstr) 12))
			      (set! ans (cons kstr ans))))
			'(#\# #f #\b)))
	    '(#\A #\B #\C #\D #\E #\F #\G))
  ans)

;;;; Transpose notes and chords.

(define (transpose-measures line)
  (define len (string-length line))
  (do ((idx 0 (+ 1 idx)))
      ((>= idx len))
    (case (string-ref line idx)
      ((#\%)
       (display (substring line idx len) *abc-output-port*)
       (set! idx len))
      ((#\[)
       (display #\[ *abc-output-port*)
       (if (and (not (eqv? #\| (string-ref line (+ 1 idx))))
		(not (char-numeric? (string-ref line (+ 1 idx)))))
	   (let ((width (string-index (substring line (+ 1 idx) len) #\])))
	     (cond
	      (width
	       (transpose-line (substring line (+ 1 idx) (+ 1 width idx)))
	       (display #\] *abc-output-port*)
	       (set! idx (+ 1 width idx)))))))
      ((#\")
       (let ((width (string-index (substring line (+ 1 idx) len) #\")))
	 (cond
	  (width
	   (transpose-guitar-chord (substring line (+ 1 idx) (+ 1 width idx)))
	   (set! idx (+ 1 width idx))))))
      ((#\^ #\_ #\=)
       (let ((end (+ idx
		     (case (and (< (+ 1 idx) len) (string-ref line (+ 1 idx)))
		       ((#\^ #\_) (case (and (< (+ 3 idx) len)
					     (string-ref line (+ 3 idx)))
				    ((#\, #\') 4)
				    (else 3)))
		       (else (case (and (< (+ 2 idx) len)
					(string-ref line (+ 2 idx)))
			       ((#\, #\') 3)
			       (else 2)))))))
	 (transpose-note (substring line idx end))
	 (set! idx (+ -1 end))))
      ((#\A #\B #\C #\D #\E #\F #\G #\a #\b #\c #\d #\e #\f #\g)
       (let ((end (+ idx
		     (case (and (< (+ 1 idx) len) (string-ref line (+ 1 idx)))
		       ((#\, #\') 2)
		       (else 1)))))
	 (transpose-note (substring line idx end))
	 (set! idx (+ -1 end))))
      (else (display (string-ref line idx) *abc-output-port*)))))

;;;; Guitar Chords and Keys.

(define (display-note-acc note acc)
  (define nstr (string-ref "CDEFGAB" (modulo note 7)))
  (display nstr *abc-output-port*)
  (display (case acc
	     ((-1) "b")
	     ((0) "")
	     ((1) "#")
	     (else (transpose-error
		    406 "Strange chord accidental: "
		    nstr " " (number->string acc))))
	   *abc-output-port*))

(define (transpose-guitar-chord word)
  (define len (string-length word))
  (if (not transpose-shift)
      (transpose-error 406 "Key not set for chord: " word))
  (cond ((and (> len 0) (string-index "CDEFGAB" (string-ref word 0)))
	 => (lambda (gcidx)
	      (cond
	       ((not preserve-guitar?))
	       (else
		(display #\" *abc-output-port*)
		(if transpose-guitar?
		    (let* ((idx (case (and (>= len 2) (string-ref word 1))
				  ((#\# #\b) 2)
				  (else 1)))
			   (tonic (substring word 0 idx)))
		      (display-note-acc
		       (+ gcidx transpose-shift)
		       (+ (- (key->acc tonic)
			     (vector-ref original-sharp-table gcidx))
			  (vector-ref transposed-sharp-table
				      (modulo (+ gcidx transpose-shift) 7))))
		      ;;(= (vector-ref original-sharp-table gcidx) (key->acc tonic))
		      (display (substring word idx len) *abc-output-port*))
		    (display word *abc-output-port*))
		(display #\" *abc-output-port*)))))
	(else
	 (display #\" *abc-output-port*)
	 (display word *abc-output-port*)
	 (display #\" *abc-output-port*))))

(define (key->acc key)
  (case (and (> (string-length key) 1) (string-ref key 1))
    ((#\#) 1)
    ((#\b) -1)
    (else 0)))

;;;; Notes.

(define (display-acc-note acc note)
  (display (case acc
	     ((-2) "__")
	     ((-1) "_")
	     ((0) "=")
	     ((1) "^")
	     ((2) "^^")
	     (else "")) *abc-output-port*)
  (display ((case (quotient note 7)
	      ((0 1) char-upcase)
	      ((2 3) char-downcase)
	      (else identity))
	    (string-ref "CDEFGAB" (modulo note 7))) *abc-output-port*)
  (display (case (quotient note 7)
	     ((0 -1) ",")
	     ((1 2) "")
	     ((3 4) "'")
	     (else "")) *abc-output-port*))

(define (transpose-note note)
  (define acc #f)
  (define idx #f)
  (if (not transpose-shift)
      (transpose-error 406 "Key not set for note: " note))
  (for-each (lambda (chr)
	      (case chr
		((#\^) (set! acc (+ 1 (or acc 0))))
		((#\_) (set! acc (+ -1 (or acc 0))))
		((#\=) (set! acc 0))
		((#\C #\D #\E #\F #\G #\A #\B #\c #\d #\e #\f #\g #\a #\b)
		 (set! idx (+ 7 (string-index "CDEFGABcdefgab" chr))))
		((#\,) (set! idx (+ -7 idx)))
		((#\') (set! idx (+ +7 idx)))))
	    (string->list note))
  (if (not idx)
      (transpose-error 406 "Couldn't parse note: " note))
  (display-acc-note (and
		     acc
		     (+ (- acc (vector-ref original-sharp-table
					   (modulo idx 7)))
			(vector-ref transposed-sharp-table
				    (modulo (+ idx transpose-shift) 7))))
		    (+ idx transpose-shift)))

;;;; Test.

(define (trtest)
  (do ((i -12 (+ i 1))) ((> i 12))
    (print i '-> (interval->pitch-delta i)))
  (cond ((number? (string->number "0.5"))
	 (do ((i -12.0 (+ i 1))) ((> i 12))
	   (print i '-> (interval->pitch-delta i)))
	 (do ((i -12.0 (+ i 1))) ((> i 12))
	   (if (not (zero? i))
	       (print 1 '/ i '-> (interval->pitch-delta (/ i)))))))
  (do ((i -1 (+ i 1))) ((> i 1))
    (let ((basename (transpose-by i "SomogyiKarikazo" "tmp")))
      (cond ((string? basename)
	     (system (string-append "abc " basename))
	     (sleep 2))))))

(define (trim-whitespace str)
  (let loop ((idx (+ -1 (string-length str))))
    (cond
     ((negative? idx) "")
     ((char-whitespace? (string-ref str idx))
      (loop (+ -1 idx)))
     (else (substring str 0 (+ 1 idx))))))

(define (open-url-pipe url)
  (and (eqv? 0 (substring? "http://" url))
       (not (string-index url #\"))
       (open-input-pipe (string-append "wget -q -O- " url ""))))

(define (line-start str)
  (if (> (string-length str) 50)
      (string-append (substring str 0 50) "...")
      str))

(define (quotize str)
  (string-append "\"" (string-subst str "\n" "<br>") "\""))

(define (path->filename str)
  (define idx (string-reverse-index str #\/))
  (and idx (substring str (+ 1 idx) (string-length str))))

(define (string-starts-with? str prefix)
  (define len (string-length prefix))
  (if (<= (string-length str) len)
      #f
      (string=? (substring str 0 len) prefix)))

(define (trserve request-line query-string header-alist)
  (define qalst (and query-string (uri:decode-query query-string)))
  ;; (display "Content-Type: text/plain\n\n")
  ;; (display query-string) (newline)
  ;;(pretty-print qalst)
  (let ((key/int (assq 'interval qalst))
	(abc (assq 'abc qalst))
	(mime (assq 'mime qalst)))
    (cond
     ((not key/int) (list 400 "Missing key or interval"))
     ((not abc) (list 400 "Missing ABC or URL of file to transpose"))
     (else
      (set! key/int (cadr key/int))
      (set! abc (cadr abc))
      (let ()
	(define (do-transpose pip fname)
	  (call-with-current-continuation
	   (lambda (escape)
	     (define ret #f)
	     (set! transpose-escape escape)
	     (let ((rstr (call-with-output-string
			     (lambda (oprt)
			       (set! ret (transpose key/int pip oprt))))))
	       (cond
		((list? ret) ret)
		((equal? rstr "") (list 411 "Empty tune?"))
		((string? rstr)
		 (string-append
		  "Content-Type: "
		  (if mime "text/vnd.abc" "text/plain")
		  "\n"
		  (cond
		   ((not fname) "")
		   (mime (string-append
			  "Content-Disposition: attachment; filename=\""
			  fname
			  "\""))
		   (else "Content-Disposition: inline"))
		  "\n\n"
		  rstr))
		(else ret))))))
	(cond
	 ((string-starts-with? abc "http")
	  (set! abc (trim-whitespace abc))
	  (let ((pip (open-url-pipe abc)))
	    (cond
	     ((not pip) (list 404 "Could not fetch" abc))
	     ((eof-object? (peek-char pip))
	      (list 404 "Not Found" (quotize abc)))
	     ((not (eqv? #\X (peek-char pip)))
	      (list 415
		    "Not an ABC file: " abc
		    " First line is: " (line-start (read-line pip))))
	     (else
	      (do-transpose pip (path->filename abc))))))
	 (else
	  (call-with-input-string abc
	    (lambda (sp) (do-transpose sp #f))))))))))

;;; Local Variables:
;;; mode:scheme
;;; End:
(if *script* (exit (transpose.script (list-tail *argv* *optind*))))
