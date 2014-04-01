
create_note = function() {
		var abc_note = {"pitches": [{ "pitch": 0,
                                      "verticalPos": 0 }],
                        "duration": 0.5,
                        "el_type": "note",
                        "startChar": 1,
                        "endChar": 2,
                        "averagepitch": 0,
                        "minpitch": 0,
                        "maxpitch": 0
                        };
                
    return abc_note;                
}

module('abc_duration_to_teoria_duration');
test('dots', function() {
    equal(abc_duration_to_teoria_duration(.5).dots, 0, 'no dots with 0.5');
    equal(abc_duration_to_teoria_duration(.75).dots, 1, '1 dot with 0.75');
    equal(abc_duration_to_teoria_duration(.875).dots, 2, '2 dots with 0.875');

    equal(abc_duration_to_teoria_duration(.25).dots, 0, '0 dots with 0.25');
    equal(abc_duration_to_teoria_duration(.375).dots, 1, '1 dot with 0.375');

    equal(abc_duration_to_teoria_duration(.125).dots, 0, '0 dots with 0.125');
    equal(abc_duration_to_teoria_duration(.1875).dots, 1, '1 dotwith 0.1875');
});

test('value', function() {
    equal(abc_duration_to_teoria_duration(1).value, 1, 'Whole note with 1');

    equal(abc_duration_to_teoria_duration(.5).value, 2, 'Half note with 0.5');
    equal(abc_duration_to_teoria_duration(.75).value, 2, 'Half note with 0.75');
    equal(abc_duration_to_teoria_duration(.875).value, 2, 'Half note with 0.875');

    equal(abc_duration_to_teoria_duration(.25).value, 4, 'Quarter note with 0.25');
    equal(abc_duration_to_teoria_duration(.375).value, 4, 'Quarter note with 0.375');

    equal(abc_duration_to_teoria_duration(.125).value, 8, 'Eight note with 0.125');
    equal(abc_duration_to_teoria_duration(.1875).value, 8, 'Eight note with 0.1875');

    equal(abc_duration_to_teoria_duration(.0625).value, 16, 'Sixteenth note with 0.0625');
});

module('teoria_duration_to_abc_duration');
test('teoria_duration_to_abc_duration', function() {
	
	equal(teoria_duration_to_abc_duration( {value:1, dots:0} ), 1.0, 'Whole note');
	equal(teoria_duration_to_abc_duration( {value:2, dots:0} ), 0.5, 'Half note');
	equal(teoria_duration_to_abc_duration( {value:4, dots:0} ), 0.25, 'Quarter note');
	equal(teoria_duration_to_abc_duration( {value:8, dots:0} ), 0.125, 'Eigth note');
	equal(teoria_duration_to_abc_duration( {value:16, dots:0} ), 0.0625, 'Sixteenth note');
	
	equal(teoria_duration_to_abc_duration( {value:2, dots:1} ), 0.75, 'Half note 1 dot');
	equal(teoria_duration_to_abc_duration( {value:4, dots:1} ), 0.375, 'Quarter note 1 dot');
	equal(teoria_duration_to_abc_duration( {value:8, dots:1} ), 0.1875, 'Eigth note 1 dot');
	
	equal(teoria_duration_to_abc_duration( {value:2, dots:2} ), 0.875, 'Half note 2 dots');	
});

module('teoria_note_to_abc_note');
test('c-note', function() {
	
	deepEqual(teoria_note_to_abc_note(teoria.note('c\'')), {pitch:14, verticalPos:14, accidental:""}, 'c\' note');
	deepEqual(teoria_note_to_abc_note(teoria.note('c')), {pitch:7, verticalPos:7, accidental:""}, 'c note');
	deepEqual(teoria_note_to_abc_note(teoria.note('c#')), {pitch:7, verticalPos:7, accidental:"sharp"}, 'c# note');
	deepEqual(teoria_note_to_abc_note(teoria.note('C')), {pitch:0, verticalPos:0, accidental:""}, 'C note');
	deepEqual(teoria_note_to_abc_note(teoria.note('C,')), {pitch:-7, verticalPos:-7, accidental:""}, 'C, note');
	deepEqual(teoria_note_to_abc_note(teoria.note('Cb,')), {pitch:-7, verticalPos:-7, accidental:"flat"}, 'Cb, note');
});
test('d-note', function() {	
	deepEqual(teoria_note_to_abc_note(teoria.note('d\'')), {pitch:15, verticalPos:15, accidental:""}, 'd\' note');
	deepEqual(teoria_note_to_abc_note(teoria.note('d')), {pitch:8, verticalPos:8, accidental:""}, 'd note');
	deepEqual(teoria_note_to_abc_note(teoria.note('d#')), {pitch:8, verticalPos:8, accidental:"sharp"}, 'd# note');
	deepEqual(teoria_note_to_abc_note(teoria.note('D')), {pitch:1, verticalPos:1, accidental:""}, 'D note');
	deepEqual(teoria_note_to_abc_note(teoria.note('D,')), {pitch:-6, verticalPos:-6, accidental:""}, 'D, note');
	deepEqual(teoria_note_to_abc_note(teoria.note('Db,')), {pitch:-6, verticalPos:-6, accidental:"flat"}, 'Db, note');
});
test('e-note', function() {		
	deepEqual(teoria_note_to_abc_note(teoria.note('e\'')), {pitch:16, verticalPos:16, accidental:""}, 'e\' note');
	deepEqual(teoria_note_to_abc_note(teoria.note('e')), {pitch:9, verticalPos:9, accidental:""}, 'e note');
	deepEqual(teoria_note_to_abc_note(teoria.note('e#')), {pitch:9, verticalPos:9, accidental:"sharp"}, 'e# note');
	deepEqual(teoria_note_to_abc_note(teoria.note('E')), {pitch:2, verticalPos:2, accidental:""}, 'E note');
	deepEqual(teoria_note_to_abc_note(teoria.note('E,')), {pitch:-5, verticalPos:-5, accidental:""}, 'E, note');
	deepEqual(teoria_note_to_abc_note(teoria.note('Eb,')), {pitch:-5, verticalPos:-5, accidental:"flat"}, 'Eb, note');
});
test('f-note', function() {		    
	deepEqual(teoria_note_to_abc_note(teoria.note('f\'')), {pitch:17, verticalPos:17, accidental:""}, 'f\' note');
	deepEqual(teoria_note_to_abc_note(teoria.note('f')), {pitch:10, verticalPos:10, accidental:""}, 'f note');
	deepEqual(teoria_note_to_abc_note(teoria.note('f#')), {pitch:10, verticalPos:10, accidental:"sharp"}, 'f# note');
	deepEqual(teoria_note_to_abc_note(teoria.note('F')), {pitch:3, verticalPos:3, accidental:""}, 'F note');
	deepEqual(teoria_note_to_abc_note(teoria.note('F,')), {pitch:-4, verticalPos:-4, accidental:""}, 'F, note');
	deepEqual(teoria_note_to_abc_note(teoria.note('Fb,')), {pitch:-4, verticalPos:-4, accidental:"flat"}, 'Fb, note');    
});
test('g-note', function() {		    
	deepEqual(teoria_note_to_abc_note(teoria.note('g\'')), {pitch:18, verticalPos:18, accidental:""}, 'g\' note');
    deepEqual(teoria_note_to_abc_note(teoria.note('g')), {pitch:11, verticalPos:11, accidental:""}, 'g note');
	deepEqual(teoria_note_to_abc_note(teoria.note('g#')), {pitch:11, verticalPos:11, accidental:"sharp"}, 'g# note');
	deepEqual(teoria_note_to_abc_note(teoria.note('G')), {pitch:4, verticalPos:4, accidental:""}, 'G note');
	deepEqual(teoria_note_to_abc_note(teoria.note('G,')), {pitch:-3, verticalPos:-3, accidental:""}, 'G, note');
	deepEqual(teoria_note_to_abc_note(teoria.note('Gb,')), {pitch:-3, verticalPos:-3, accidental:"flat"}, 'Gb, note');	
});
test('a-note', function() {		
	deepEqual(teoria_note_to_abc_note(teoria.note('a\'')), {pitch:19, verticalPos:19, accidental:""}, 'a\' note');
    deepEqual(teoria_note_to_abc_note(teoria.note('a')), {pitch:12, verticalPos:12, accidental:""}, 'a note');
	deepEqual(teoria_note_to_abc_note(teoria.note('a#')), {pitch:12, verticalPos:12, accidental:"sharp"}, 'a# note');
	deepEqual(teoria_note_to_abc_note(teoria.note('A')), {pitch:5, verticalPos:5, accidental:""}, 'A note');
	deepEqual(teoria_note_to_abc_note(teoria.note('A,')), {pitch:-2, verticalPos:-2, accidental:""}, 'A, note');
	deepEqual(teoria_note_to_abc_note(teoria.note('Ab,')), {pitch:-2, verticalPos:-2, accidental:"flat"}, 'Ab, note');	
});
test('b-note', function() {		
	deepEqual(teoria_note_to_abc_note(teoria.note('b\'')), {pitch:20, verticalPos:20, accidental:""}, 'b\' note');
	deepEqual(teoria_note_to_abc_note(teoria.note('b')), {pitch:13, verticalPos:13, accidental:""}, 'b note');
	deepEqual(teoria_note_to_abc_note(teoria.note('b#')), {pitch:13, verticalPos:13, accidental:"sharp"}, 'b# note');
	deepEqual(teoria_note_to_abc_note(teoria.note('B')), {pitch:6, verticalPos:6, accidental:""}, 'B note');
	deepEqual(teoria_note_to_abc_note(teoria.note('B,')), {pitch:-1, verticalPos:-1, accidental:""}, 'B, note');
	deepEqual(teoria_note_to_abc_note(teoria.note('Bb,')), {pitch:-1, verticalPos:-1, accidental:"flat"}, 'Bb, note');       
	
});

module( 'transpose_note');
test('Perfect', function() {	
    
    deepEqual(transpose_note(create_note(), teoria.interval('P1')).pitches[0].pitch, 0, 'Transpose a C note a major second up results in D note');
    deepEqual(transpose_note(create_note(), teoria.interval('P1')).pitches[0].accidental, "", 'Transpose a C note a major second up results in no accidental');
    
    deepEqual(transpose_note(create_note(), teoria.interval('P4')).pitches[0].pitch, 3, 'Transpose a C note a minor second up results in E note');
    deepEqual(transpose_note(create_note(), teoria.interval('P4')).pitches[0].accidental, "", 'Transpose a C note a minor second up results in no accidental');
    
    deepEqual(transpose_note(create_note(), teoria.interval('P5')).pitches[0].pitch, 4, 'Transpose a C note a minor second up results in E note');
    deepEqual(transpose_note(create_note(), teoria.interval('P5')).pitches[0].accidental, "", 'Transpose a C note a minor second up results in no accidental');

    deepEqual(transpose_note(create_note(), teoria.interval('P8')).pitches[0].pitch, 7, 'Transpose a C note a minor second up results in E note');
    deepEqual(transpose_note(create_note(), teoria.interval('P8')).pitches[0].accidental, "", 'Transpose a C note a minor second up results in no accidental');
});

test('Major', function() {	
    
    deepEqual(transpose_note(create_note(), teoria.interval('M2')).pitches[0].pitch, 1, 'Transpose a C note a major second up results in D note');
    deepEqual(transpose_note(create_note(), teoria.interval('M2')).pitches[0].accidental, "", 'Transpose a C note a major second up results in no accidental');
    
    deepEqual(transpose_note(create_note(), teoria.interval('M3')).pitches[0].pitch, 2, 'Transpose a C note a minor second up results in E note');
    deepEqual(transpose_note(create_note(), teoria.interval('M3')).pitches[0].accidental, "", 'Transpose a C note a minor second up results in no accidental');
    
    deepEqual(transpose_note(create_note(), teoria.interval('M6')).pitches[0].pitch, 5, 'Transpose a C note a minor second up results in E note');
    deepEqual(transpose_note(create_note(), teoria.interval('M6')).pitches[0].accidental, "", 'Transpose a C note a minor second up results in no accidental');

    deepEqual(transpose_note(create_note(), teoria.interval('M7')).pitches[0].pitch, 6, 'Transpose a C note a minor second up results in E note');
    deepEqual(transpose_note(create_note(), teoria.interval('M7')).pitches[0].accidental, "", 'Transpose a C note a minor second up results in no accidental');
});

test('Minor', function() {
	
    deepEqual(transpose_note(create_note(), teoria.interval('m2')).pitches[0].pitch, 1, 'Transpose a C note a minor second up results in D note');
    deepEqual(transpose_note(create_note(), teoria.interval('m2')).pitches[0].accidental, "flat", 'Transpose a C note a minor second up results in b accidental');

    deepEqual(transpose_note(create_note(), teoria.interval('m3')).pitches[0].pitch, 2, 'Transpose a C note a minor second up results in E note');
    deepEqual(transpose_note(create_note(), teoria.interval('m3')).pitches[0].accidental, "flat", 'Transpose a C note a minor second up results in no accidental');
    
    deepEqual(transpose_note(create_note(), teoria.interval('m6')).pitches[0].pitch, 5, 'Transpose a C note a minor second up results in E note');
    deepEqual(transpose_note(create_note(), teoria.interval('m6')).pitches[0].accidental, "flat", 'Transpose a C note a minor second up results in no accidental');

    deepEqual(transpose_note(create_note(), teoria.interval('m7')).pitches[0].pitch, 6, 'Transpose a C note a minor second up results in E note');
    deepEqual(transpose_note(create_note(), teoria.interval('m7')).pitches[0].accidental, "flat", 'Transpose a C note a minor second up results in no accidental');
});

test('Augmented', function() {
	
    deepEqual(transpose_note(create_note(), teoria.interval('A1')).pitches[0].accidental, "sharp", 'Transpose a C note a augmented prime up results in # accidental');
    deepEqual(transpose_note(create_note(), teoria.interval('A1')).pitches[0].pitch, 0, 'Transpose a C note a augmented prime up results in C pitch');
    
    deepEqual(transpose_note(create_note(), teoria.interval('A2')).pitches[0].accidental, "sharp", 'Transpose a C note a augmented prime up results in # accidental');
    deepEqual(transpose_note(create_note(), teoria.interval('A2')).pitches[0].pitch, 1, 'Transpose a C note a augmented prime up results in C pitch');
    
    deepEqual(transpose_note(create_note(), teoria.interval('A3')).pitches[0].accidental, "sharp", 'Transpose a C note a augmented prime up results in # accidental');
    deepEqual(transpose_note(create_note(), teoria.interval('A3')).pitches[0].pitch, 2, 'Transpose a C note a augmented prime up results in C pitch');
    
    deepEqual(transpose_note(create_note(), teoria.interval('A4')).pitches[0].accidental, "sharp", 'Transpose a C note a augmented prime up results in # accidental');
    deepEqual(transpose_note(create_note(), teoria.interval('A4')).pitches[0].pitch, 3, 'Transpose a C note a augmented prime up results in C pitch');
    
    deepEqual(transpose_note(create_note(), teoria.interval('A5')).pitches[0].accidental, "sharp", 'Transpose a C note a augmented prime up results in # accidental');
    deepEqual(transpose_note(create_note(), teoria.interval('A5')).pitches[0].pitch, 4, 'Transpose a C note a augmented prime up results in C pitch');
    
    deepEqual(transpose_note(create_note(), teoria.interval('A6')).pitches[0].accidental, "sharp", 'Transpose a C note a augmented prime up results in # accidental');
    deepEqual(transpose_note(create_note(), teoria.interval('A6')).pitches[0].pitch, 5, 'Transpose a C note a augmented prime up results in C pitch');
    
    deepEqual(transpose_note(create_note(), teoria.interval('A7')).pitches[0].accidental, "sharp", 'Transpose a C note a augmented prime up results in # accidental');
    deepEqual(transpose_note(create_note(), teoria.interval('A7')).pitches[0].pitch, 6, 'Transpose a C note a augmented prime up results in C pitch');
});

test('Diminished', function() {
	
    deepEqual(transpose_note(create_note(), teoria.interval('d2')).pitches[0].accidental, "dblflat", 'Transpose a C note a augmented prime up results in # accidental');
    deepEqual(transpose_note(create_note(), teoria.interval('d2')).pitches[0].pitch, 1, 'Transpose a C note a augmented prime up results in C pitch');
    
    deepEqual(transpose_note(create_note(), teoria.interval('d3')).pitches[0].accidental, "dblflat", 'Transpose a C note a augmented prime up results in # accidental');
    deepEqual(transpose_note(create_note(), teoria.interval('d3')).pitches[0].pitch, 2, 'Transpose a C note a augmented prime up results in C pitch');
    
    deepEqual(transpose_note(create_note(), teoria.interval('d4')).pitches[0].accidental, "flat", 'Transpose a C note a augmented prime up results in # accidental');
    deepEqual(transpose_note(create_note(), teoria.interval('d4')).pitches[0].pitch, 3, 'Transpose a C note a augmented prime up results in C pitch');
    
    deepEqual(transpose_note(create_note(), teoria.interval('d5')).pitches[0].accidental, "flat", 'Transpose a C note a augmented prime up results in # accidental');
    deepEqual(transpose_note(create_note(), teoria.interval('d5')).pitches[0].pitch, 4, 'Transpose a C note a augmented prime up results in C pitch');
    
    deepEqual(transpose_note(create_note(), teoria.interval('d6')).pitches[0].accidental, "dblflat", 'Transpose a C note a augmented prime up results in # accidental');
    deepEqual(transpose_note(create_note(), teoria.interval('d6')).pitches[0].pitch, 5, 'Transpose a C note a augmented prime up results in C pitch');
    
    deepEqual(transpose_note(create_note(), teoria.interval('d7')).pitches[0].accidental, "dblflat", 'Transpose a C note a augmented prime up results in # accidental');
    deepEqual(transpose_note(create_note(), teoria.interval('d7')).pitches[0].pitch, 6, 'Transpose a C note a augmented prime up results in C pitch');
});


