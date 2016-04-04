QUnit.module('RJ_teoria_abc_glue.abc_duration_to_teoria_duration');
test('dots', function() {
    equal(RJ_teoria_abc_glue.abc_duration_to_teoria_duration(0.5).dots, 0, 'no dots with 0.5');
    equal(RJ_teoria_abc_glue.abc_duration_to_teoria_duration(0.75).dots, 1, '1 dot with 0.75');
    equal(RJ_teoria_abc_glue.abc_duration_to_teoria_duration(0.875).dots, 2, '2 dots with 0.875');

    equal(RJ_teoria_abc_glue.abc_duration_to_teoria_duration(0.25).dots, 0, '0 dots with 0.25');
    equal(RJ_teoria_abc_glue.abc_duration_to_teoria_duration(0.375).dots, 1, '1 dot with 0.375');

    equal(RJ_teoria_abc_glue.abc_duration_to_teoria_duration(0.125).dots, 0, '0 dots with 0.125');
    equal(RJ_teoria_abc_glue.abc_duration_to_teoria_duration(0.1875).dots, 1, '1 dotwith 0.1875');
});

test('value', function() {
    equal(RJ_teoria_abc_glue.abc_duration_to_teoria_duration(1).value, 1, 'Whole note with 1');

    equal(RJ_teoria_abc_glue.abc_duration_to_teoria_duration(0.5).value, 2, 'Half note with 0.5');
    equal(RJ_teoria_abc_glue.abc_duration_to_teoria_duration(0.75).value, 2, 'Half note with 0.75');
    equal(RJ_teoria_abc_glue.abc_duration_to_teoria_duration(0.875).value, 2, 'Half note with 0.875');

    equal(RJ_teoria_abc_glue.abc_duration_to_teoria_duration(0.25).value, 4, 'Quarter note with 0.25');
    equal(RJ_teoria_abc_glue.abc_duration_to_teoria_duration(0.375).value, 4, 'Quarter note with 0.375');

    equal(RJ_teoria_abc_glue.abc_duration_to_teoria_duration(0.125).value, 8, 'Eight note with 0.125');
    equal(RJ_teoria_abc_glue.abc_duration_to_teoria_duration(0.1875).value, 8, 'Eight note with 0.1875');

    equal(RJ_teoria_abc_glue.abc_duration_to_teoria_duration(0.0625).value, 16, 'Sixteenth note with 0.0625');
});

QUnit.module('RJ_teoria_abc_glue.teoria_duration_to_abc_duration');
test('RJ_teoria_abc_glue.teoria_duration_to_abc_duration', function() {

    var test_set = [{ teoria_dur: { value:  1, dots: 0}, abc_dur: 1.0,    txt: 'Whole note'},
                    { teoria_dur: { value:  2, dots: 0}, abc_dur: 0.5,    txt: 'Half note'},
                    { teoria_dur: { value:  4, dots: 0}, abc_dur: 0.25,   txt: 'Quarter note'},
                    { teoria_dur: { value:  8, dots: 0}, abc_dur: 0.125,  txt: 'Eight note'},
                    { teoria_dur: { value: 16, dots: 0}, abc_dur: 0.0625, txt: 'Sixteenth note'},

                    { teoria_dur: { value:  2, dots: 1}, abc_dur: 0.75,   txt: 'Half note 1 dot'},
                    { teoria_dur: { value:  4, dots: 1}, abc_dur: 0.375,  txt: 'Quarter note 1 dot'},
                    { teoria_dur: { value:  8, dots: 1}, abc_dur: 0.1875, txt: 'Eigth note 1 dot'},

                    { teoria_dur: { value:  2, dots: 2}, abc_dur: 0.875,  txt: 'Half note 2 dots'}]

    test_set.forEach(function(set) {

        equal(RJ_teoria_abc_glue.teoria_duration_to_abc_duration({
            value: set.teoria_dur.value,
            dots: set.teoria_dur.dots,
        }), set.abc_dur, set.txt);

    });
});

QUnit.module('RJ_teoria_abc_glue.teoria_note_to_abc_note');
test('c-note', function() {

    var test_set = [{ teoria_note: 'c\'', abc: { pitch: 14, acc: ''     }},
                    { teoria_note: 'c',   abc: { pitch:  7, acc: ''     }},
                    { teoria_note: 'c#',  abc: { pitch:  7, acc: 'sharp'}},
                    { teoria_note: 'C',   abc: { pitch:  0, acc: ''     }},
                    { teoria_note: 'C,',  abc: { pitch: -7, acc: ''     }},
                    { teoria_note: 'Cb,', abc: { pitch: -7, acc: 'flat' }}]

     test_teoria_note_to_abc( test_set);
});
test('d-note', function() {

    var test_set = [{ teoria_note: 'd\'', abc: { pitch: 15, acc: ''     }},
                    { teoria_note: 'd',   abc: { pitch:  8, acc: ''     }},
                    { teoria_note: 'd#',  abc: { pitch:  8, acc: 'sharp'}},
                    { teoria_note: 'D',   abc: { pitch:  1, acc: ''     }},
                    { teoria_note: 'D,',  abc: { pitch: -6, acc: ''     }},
                    { teoria_note: 'Db,', abc: { pitch: -6, acc: 'flat' }}]

     test_teoria_note_to_abc( test_set);

});
test('e-note', function() {

    var test_set = [{ teoria_note: 'e\'', abc: { pitch: 16, acc: ''     }},
                    { teoria_note: 'e',   abc: { pitch:  9, acc: ''     }},
                    { teoria_note: 'e#',  abc: { pitch:  9, acc: 'sharp'}},
                    { teoria_note: 'E',   abc: { pitch:  2, acc: ''     }},
                    { teoria_note: 'E,',  abc: { pitch: -5, acc: ''     }},
                    { teoria_note: 'Eb,', abc: { pitch: -5, acc: 'flat' }}]

     test_teoria_note_to_abc( test_set);
});
test('f-note', function() {

    var test_set = [{ teoria_note: 'f\'', abc: { pitch: 17, acc: ''     }},
                    { teoria_note: 'f',   abc: { pitch: 10, acc: ''     }},
                    { teoria_note: 'f#',  abc: { pitch: 10, acc: 'sharp'}},
                    { teoria_note: 'F',   abc: { pitch:  3, acc: ''     }},
                    { teoria_note: 'F,',  abc: { pitch: -4, acc: ''     }},
                    { teoria_note: 'Fb,', abc: { pitch: -4, acc: 'flat' }}]

    test_teoria_note_to_abc( test_set);
});
test('g-note', function() {

    var test_set = [{ teoria_note: 'g\'', abc: { pitch: 18, acc: ''     }},
                    { teoria_note: 'g',   abc: { pitch: 11, acc: ''     }},
                    { teoria_note: 'g#',  abc: { pitch: 11, acc: 'sharp'}},
                    { teoria_note: 'G',   abc: { pitch:  4, acc: ''     }},
                    { teoria_note: 'G,',  abc: { pitch: -3, acc: ''     }},
                    { teoria_note: 'Gb,', abc: { pitch: -3, acc: 'flat' }}]

    test_teoria_note_to_abc( test_set);
});
test('a-note', function() {

    var test_set = [{ teoria_note: 'a\'', abc: { pitch: 19, acc: ''     }},
                    { teoria_note: 'a',   abc: { pitch: 12, acc: ''     }},
                    { teoria_note: 'a#',  abc: { pitch: 12, acc: 'sharp'}},
                    { teoria_note: 'A',   abc: { pitch:  5, acc: ''     }},
                    { teoria_note: 'A,',  abc: { pitch: -2, acc: ''     }},
                    { teoria_note: 'Ab,', abc: { pitch: -2, acc: 'flat' }}]

    test_teoria_note_to_abc( test_set);
});
test('b-note', function() {

    var test_set = [{ teoria_note: 'b\'', abc: { pitch: 20, acc: ''     }},
                    { teoria_note: 'b',   abc: { pitch: 13, acc: ''     }},
                    { teoria_note: 'b#',  abc: { pitch: 13, acc: 'sharp'}},
                    { teoria_note: 'B',   abc: { pitch:  6, acc: ''     }},
                    { teoria_note: 'B,',  abc: { pitch: -1, acc: ''     }},
                    { teoria_note: 'Bb,', abc: { pitch: -1, acc: 'flat' }}]

    test_teoria_note_to_abc( test_set);
});

QUnit.module('RJ_transpose.key_signature_from_teoria_key');
test('default', function() {
    var clef = create_clef("treble");

    deepEqual(RJ_transpose.key_signature_from_teoria_key('C', clef), create_key_signature("CM"));
    deepEqual(RJ_transpose.key_signature_from_teoria_key('C#', clef), create_key_signature("C#M"));
    deepEqual(RJ_transpose.key_signature_from_teoria_key('D', clef), create_key_signature("DM"));
    deepEqual(RJ_transpose.key_signature_from_teoria_key('D#', clef), create_key_signature("EbM"));
    deepEqual(RJ_transpose.key_signature_from_teoria_key('E', clef), create_key_signature("EM"));
    deepEqual(RJ_transpose.key_signature_from_teoria_key('F', clef), create_key_signature("FM"));
    deepEqual(RJ_transpose.key_signature_from_teoria_key('F#', clef), create_key_signature("F#M"));
    deepEqual(RJ_transpose.key_signature_from_teoria_key('G', clef), create_key_signature("GM"));
    deepEqual(RJ_transpose.key_signature_from_teoria_key('G#', clef), create_key_signature("AbM"));
    deepEqual(RJ_transpose.key_signature_from_teoria_key('A', clef), create_key_signature("AM"));
    deepEqual(RJ_transpose.key_signature_from_teoria_key('A#', clef), create_key_signature("BbM"));
    deepEqual(RJ_transpose.key_signature_from_teoria_key('B', clef), create_key_signature("BM"));
});

QUnit.module('RJ_transpose.key');
test('Perfect interval', function() {

    var clef = create_clef("treble");
    var current_key_signature = create_key_signature("CM");

    deepEqual(RJ_transpose.key("C", clef, teoria.interval('P1')), create_key_signature("CM"), 'Test transpose key C with P1 to CM');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('P4')), create_key_signature("FM"), 'Test transpose key C with P4 to FM');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('P5')), create_key_signature("GM"), 'Test transpose key C with P5 to BbM');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('P8')), create_key_signature("CM"), 'Test transpose key C with P8 to EbM');
});
test('Major interval', function() {

    var clef = create_clef("treble");
    var current_key_signature = create_key_signature("CM");

    deepEqual(RJ_transpose.key("C", clef, teoria.interval('M2')), create_key_signature("DM"), 'Test transpose key C with M2 to DM');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('M3')), create_key_signature("EM"), 'Test transpose key C with M3 to EM');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('M6')), create_key_signature("AM"), 'Test transpose key C with M6 to AM');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('M7')), create_key_signature("BM"), 'Test transpose key C with M7 to BM');

});
test('Minor interval', function() {

    var clef = create_clef("treble");
    var current_key_signature = create_key_signature("CM");

    deepEqual(RJ_transpose.key("C", clef, teoria.interval('m2')), create_key_signature("DbM"), 'Test transpose key C with m2 to DbM');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('m3')), create_key_signature("EbM"), 'Test transpose key C with m3 to EbM');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('m6')), create_key_signature("AbM"), 'Test transpose key C with m6 to AbM');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('m7')), create_key_signature("BbM"), 'Test transpose key C with m7 to BbM');
});
test('Augmented interval', function() {

    var clef = create_clef("treble");
    var current_key_signature = create_key_signature("CM");

    deepEqual(RJ_transpose.key("C", clef, teoria.interval('A1')), create_key_signature("C#M"), 'Test transpose key C with A1 to C#M');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('A2')), create_key_signature("EbM"), 'Test transpose key C with A2 to EbM');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('A3')), create_key_signature("FM"), 'Test transpose key C with A3 to FM');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('A4')), create_key_signature("F#M"), 'Test transpose key C with A4 to F#M');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('A5')), create_key_signature("AbM"), 'Test transpose key C with A5 to AbM');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('A6')), create_key_signature("BbM"), 'Test transpose key C with A6 to BbM');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('A7')), create_key_signature("CM"), 'Test transpose key C with A7 to CM');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('A8')), create_key_signature("C#M"), 'Test transpose key C with A8 to C#M');
});
test('Diminished interval', function() {

    var clef = create_clef("treble");
    var current_key_signature = create_key_signature("CM");

    /* Currently RJ_transpose.key does not transpose to double flat scales */
    /*deepEqual(RJ_transpose.key("C", clef, teoria.interval('d1')), create_key_signature("CbM"), 'Test transpose key C with d1 to CbM');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('d2')), create_key_signature("AM"), 'Test transpose key C with d2 to EbM');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('d3')), create_key_signature("FM"), 'Test transpose key C with d3 to FM');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('d4')), create_key_signature("F#M"), 'Test transpose key C with d4 to F#M');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('d5')), create_key_signature("AbM"), 'Test transpose key C with d5 to AbM');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('d6')), create_key_signature("BbM"), 'Test transpose key C with d6 to BbM');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('d7')), create_key_signature("CM"), 'Test transpose key C with d7 to CM');
    deepEqual(RJ_transpose.key("C", clef, teoria.interval('d8')), create_key_signature("CbM"), 'Test transpose key C with d8 to C#M');*/
    expect(0);
});

QUnit.module('RJ_transpose.line');
test('B Bb', function() {

    // Setup
    var key = 'CM', clef = 'treble', interval = 'm2'

    //from = [['b','flat'], ['a','']]
    from = ['Bb', 'A']
    //to   = [['C','flat'], ['b','flat']]
    to   = ['Cb', 'B']

    test_transpose_line(key, clef, from, interval, to)
});

test('Jingle bells', function() {

    // Setup
    var key = 'FM', clef = 'treble', interval = 'P5'

    from = ['a', 'c', 'f', 'g']
    to   = ['E', 'g', 'C', 'D']

    test_transpose_line(key, clef, from, interval, to)
});

QUnit.module('RJ_transpose.note');
QUnit.test('Perfect', function(assert) {

    var test_set = [{ input: {note: 'c', acc:''}, interval: 'P1', exp: { note: 'c', acc: ''}},
                    { input: {note: 'c', acc:''}, interval: 'P4', exp: { note: 'f', acc: ''}},
                    { input: {note: 'c', acc:''}, interval: 'P5', exp: { note: 'g', acc: ''}},
                    { input: {note: 'c', acc:''}, interval: 'P8', exp: { note: 'C', acc: ''}}]

    test_transpose_note("treble","CM", test_set);
});

QUnit.test('Major', function(assert) {

    var test_set = [{ input: {note: 'c', acc:''}, interval: 'M2', exp: { note: 'd', acc: ''}},
                    { input: {note: 'c', acc:''}, interval: 'M3', exp: { note: 'e', acc: ''}},
                    { input: {note: 'c', acc:''}, interval: 'M6', exp: { note: 'a', acc: ''}},
                    { input: {note: 'c', acc:''}, interval: 'M7', exp: { note: 'b', acc: ''}}]

    test_transpose_note("treble","CM", test_set);
});

QUnit.test('Minor', function(assert) {

    var test_set = [{ input: {note: 'c', acc:''}, interval: 'm2', exp: { note: 'd', acc: 'flat'}},
                    { input: {note: 'c', acc:''}, interval: 'm3', exp: { note: 'e', acc: 'flat'}},
                    { input: {note: 'c', acc:''}, interval: 'm6', exp: { note: 'a', acc: 'flat'}},
                    { input: {note: 'c', acc:''}, interval: 'm7', exp: { note: 'b', acc: 'flat'}}]

    test_transpose_note("treble","CM", test_set);
});

QUnit.test('Augmented', function(assert) {

    var test_set = [{ input: {note: 'c', acc:''}, interval: 'A1', exp: { note: 'c', acc: 'sharp'}},
                    { input: {note: 'c', acc:''}, interval: 'A2', exp: { note: 'd', acc: 'sharp'}},
                    { input: {note: 'c', acc:''}, interval: 'A3', exp: { note: 'e', acc: 'sharp'}},
                    { input: {note: 'c', acc:''}, interval: 'A4', exp: { note: 'f', acc: 'sharp'}},
                    { input: {note: 'c', acc:''}, interval: 'A5', exp: { note: 'g', acc: 'sharp'}},
                    { input: {note: 'c', acc:''}, interval: 'A6', exp: { note: 'a', acc: 'sharp'}},
                    { input: {note: 'c', acc:''}, interval: 'A7', exp: { note: 'b', acc: 'sharp'}}]

    test_transpose_note("treble","CM", test_set);
});

QUnit.test('Diminished', function(assert) {

    var test_set = [{ input: {note: 'c', acc:''}, interval: 'd1', exp: { note: 'c', acc: 'flat'}},
                    { input: {note: 'c', acc:''}, interval: 'd2', exp: { note: 'd', acc: 'dblflat'}},
                    { input: {note: 'c', acc:''}, interval: 'd3', exp: { note: 'e', acc: 'dblflat'}},
                    { input: {note: 'c', acc:''}, interval: 'd4', exp: { note: 'f', acc: 'flat'}},
                    { input: {note: 'c', acc:''}, interval: 'd5', exp: { note: 'g', acc: 'flat'}},
                    { input: {note: 'c', acc:''}, interval: 'd6', exp: { note: 'a', acc: 'dblflat'}},
                    { input: {note: 'c', acc:''}, interval: 'd7', exp: { note: 'b', acc: 'dblflat'}}]

    test_transpose_note("treble","CM", test_set);
});

QUnit.module('parse key signature');
test('Major', function() {

    equal(RJ_parse.key_signature(create_key_signature('CM')), 'CM', 'Cmaj returns CM');
    equal(RJ_parse.key_signature(create_key_signature('GM')), 'GM', 'Gmaj returns GM');
    equal(RJ_parse.key_signature(create_key_signature('DM')), 'DM', 'Dmaj returns DM');
});

test('Minor', function() {
    equal(RJ_parse.key_signature(create_key_signature('Am')), 'CM', 'Amin returns CM');
    equal(RJ_parse.key_signature(create_key_signature('Dm')), 'FM', 'Dmin returns FM');
    equal(RJ_parse.key_signature(create_key_signature('Gm')), 'BbM', 'Gmin returns BbM');
});

QUnit.module('RJ_transpose.add_acc_from_key_signature');
test('flats', function() {

    var key_signature = create_key_signature('CbM');

    var test_set = [ 'f', 'b', 'E', 'a', 'D', 'f', 'C', 'F'];

    test_set.forEach(function(note_str) {

        var note = create_note(note_str, '');
        RJ_transpose.add_acc_from_key_signature(note, key_signature);

        QUnit.assert.equal_notes(note, note_str, 'flat', 'Flat accidental should be added');
    });
});

test('dblflats', function() {

    var key_signature = create_key_signature('CbM');

    var test_set = [ 'f', 'b', 'E', 'a', 'D', 'f', 'C', 'F'];

    test_set.forEach(function(note_str) {

        var note = create_note(note_str, 'flat');
        RJ_transpose.add_acc_from_key_signature(note, key_signature);

        QUnit.assert.equal_notes(note, note_str, 'dblflat', 'Flat accidental should be added');
    });
});

test('sharps', function() {

    var key_signature = create_key_signature('C#M');

    var test_set = [ 'g', 'F', 'C', 'G', 'D', 'a', 'E', 'b' ];

    test_set.forEach(function(note_str) {

        var note = create_note(note_str, '');
        RJ_transpose.add_acc_from_key_signature(note, key_signature);

        QUnit.assert.equal_notes(note, note_str, 'sharp', 'Sharp accidental should be added');
    });

});

test('dblsharps', function() {

    var key_signature = create_key_signature('C#M');

    var test_set = [ 'g', 'F', 'C', 'G', 'D', 'a', 'E', 'b' ];

    test_set.forEach(function(note_str) {

        var note = create_note(note_str, 'sharp');
        RJ_transpose.add_acc_from_key_signature(note, key_signature);

        QUnit.assert.equal_notes(note, note_str, 'dblsharp', 'Sharp accidental should be added');
    });

});


QUnit.module('RJ_transpose.remove_acc_from_key_signature');
test('flats', function() {

    var key_signature = create_key_signature('CbM');

    var test_set = [ 'f', 'b', 'E', 'a', 'D', 'f', 'C', 'F'];

    test_set.forEach(function(note_str) {

        var note = create_note(note_str, 'flat');
        RJ_transpose.remove_acc_from_key_signature(note, key_signature);

        QUnit.assert.equal_notes(note, note_str, '', 'Flat accidental should be removed');
    });
});

test('sharps', function() {

    var key_signature = create_key_signature('C#M');

    var test_set = [ 'g', 'F', 'C', 'G', 'D', 'a', 'E', 'b' ];

    test_set.forEach(function(note_str) {

        var note = create_note(note_str, 'sharp');
        RJ_transpose.remove_acc_from_key_signature(note, key_signature);

        QUnit.assert.equal_notes(note, note_str, '', 'Sharp accidental should be removed');
    });
});
