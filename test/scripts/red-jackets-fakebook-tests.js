module('abc_duration_to_teoria_duration');
test('dots', function() {
    equal(abc_duration_to_teoria_duration(0.5).dots, 0, 'no dots with 0.5');
    equal(abc_duration_to_teoria_duration(0.75).dots, 1, '1 dot with 0.75');
    equal(abc_duration_to_teoria_duration(0.875).dots, 2, '2 dots with 0.875');

    equal(abc_duration_to_teoria_duration(0.25).dots, 0, '0 dots with 0.25');
    equal(abc_duration_to_teoria_duration(0.375).dots, 1, '1 dot with 0.375');

    equal(abc_duration_to_teoria_duration(0.125).dots, 0, '0 dots with 0.125');
    equal(abc_duration_to_teoria_duration(0.1875).dots, 1, '1 dotwith 0.1875');
});

test('value', function() {
    equal(abc_duration_to_teoria_duration(1).value, 1, 'Whole note with 1');

    equal(abc_duration_to_teoria_duration(0.5).value, 2, 'Half note with 0.5');
    equal(abc_duration_to_teoria_duration(0.75).value, 2, 'Half note with 0.75');
    equal(abc_duration_to_teoria_duration(0.875).value, 2, 'Half note with 0.875');

    equal(abc_duration_to_teoria_duration(0.25).value, 4, 'Quarter note with 0.25');
    equal(abc_duration_to_teoria_duration(0.375).value, 4, 'Quarter note with 0.375');

    equal(abc_duration_to_teoria_duration(0.125).value, 8, 'Eight note with 0.125');
    equal(abc_duration_to_teoria_duration(0.1875).value, 8, 'Eight note with 0.1875');

    equal(abc_duration_to_teoria_duration(0.0625).value, 16, 'Sixteenth note with 0.0625');
});

module('teoria_duration_to_abc_duration');
test('teoria_duration_to_abc_duration', function() {

    equal(teoria_duration_to_abc_duration({
        value: 1,
        dots: 0
    }), 1.0, 'Whole note');
    equal(teoria_duration_to_abc_duration({
        value: 2,
        dots: 0
    }), 0.5, 'Half note');
    equal(teoria_duration_to_abc_duration({
        value: 4,
        dots: 0
    }), 0.25, 'Quarter note');
    equal(teoria_duration_to_abc_duration({
        value: 8,
        dots: 0
    }), 0.125, 'Eigth note');
    equal(teoria_duration_to_abc_duration({
        value: 16,
        dots: 0
    }), 0.0625, 'Sixteenth note');

    equal(teoria_duration_to_abc_duration({
        value: 2,
        dots: 1
    }), 0.75, 'Half note 1 dot');
    equal(teoria_duration_to_abc_duration({
        value: 4,
        dots: 1
    }), 0.375, 'Quarter note 1 dot');
    equal(teoria_duration_to_abc_duration({
        value: 8,
        dots: 1
    }), 0.1875, 'Eigth note 1 dot');

    equal(teoria_duration_to_abc_duration({
        value: 2,
        dots: 2
    }), 0.875, 'Half note 2 dots');
});

module('teoria_note_to_abc_note');
test('c-note', function() {

    deepEqual(teoria_note_to_abc_note(teoria.note('c\'')), {
        "pitches": [{
            pitch: 14,
            verticalPos: 14,
            accidental: ""
        }]
    }, 'c\' note');
    deepEqual(teoria_note_to_abc_note(teoria.note('c')), {

        "pitches": [{
            pitch: 7,
            verticalPos: 7,
            accidental: ""
        }]

    }, 'c note');
    deepEqual(teoria_note_to_abc_note(teoria.note('c#')), {
        "pitches": [{
            pitch: 7,
            verticalPos: 7,
            accidental: "sharp"
        }]
    }, 'c# note');
    deepEqual(teoria_note_to_abc_note(teoria.note('C')), {
        "pitches": [{
            pitch: 0,
            verticalPos: 0,
            accidental: ""
        }]
    }, 'C note');
    deepEqual(teoria_note_to_abc_note(teoria.note('C,')), {
        "pitches": [{
            pitch: -7,
            verticalPos: -7,
            accidental: ""
        }]
    }, 'C, note');
    deepEqual(teoria_note_to_abc_note(teoria.note('Cb,')), {
        "pitches": [{
            pitch: -7,
            verticalPos: -7,
            accidental: "flat"
        }]
    }, 'Cb, note');
});
test('d-note', function() {
    deepEqual(teoria_note_to_abc_note(teoria.note('d\'')), {
        "pitches": [{
            pitch: 15,
            verticalPos: 15,
            accidental: ""
        }]
    }, 'd\' note');
    deepEqual(teoria_note_to_abc_note(teoria.note('d')), {
        "pitches": [{
            pitch: 8,
            verticalPos: 8,
            accidental: ""
        }]
    }, 'd note');
    deepEqual(teoria_note_to_abc_note(teoria.note('d#')), {
        "pitches": [{
            pitch: 8,
            verticalPos: 8,
            accidental: "sharp"
        }]
    }, 'd# note');
    deepEqual(teoria_note_to_abc_note(teoria.note('D')), {
        "pitches": [{
            pitch: 1,
            verticalPos: 1,
            accidental: ""
        }]
    }, 'D note');
    deepEqual(teoria_note_to_abc_note(teoria.note('D,')), {
        "pitches": [{
            pitch: -6,
            verticalPos: -6,
            accidental: ""
        }]
    }, 'D, note');
    deepEqual(teoria_note_to_abc_note(teoria.note('Db,')), {
        "pitches": [{
            pitch: -6,
            verticalPos: -6,
            accidental: "flat"
        }]
    }, 'Db, note');
});
test('e-note', function() {
    deepEqual(teoria_note_to_abc_note(teoria.note('e\'')), {
        "pitches": [{
            pitch: 16,
            verticalPos: 16,
            accidental: ""
        }]
    }, 'e\' note');
    deepEqual(teoria_note_to_abc_note(teoria.note('e')), {
        "pitches": [{
            pitch: 9,
            verticalPos: 9,
            accidental: ""
        }]
    }, 'e note');
    deepEqual(teoria_note_to_abc_note(teoria.note('e#')), {
        "pitches": [{
            pitch: 9,
            verticalPos: 9,
            accidental: "sharp"
        }]
    }, 'e# note');
    deepEqual(teoria_note_to_abc_note(teoria.note('E')), {
        "pitches": [{
            pitch: 2,
            verticalPos: 2,
            accidental: ""
        }]
    }, 'E note');
    deepEqual(teoria_note_to_abc_note(teoria.note('E,')), {
        "pitches": [{
            pitch: -5,
            verticalPos: -5,
            accidental: ""
        }]
    }, 'E, note');
    deepEqual(teoria_note_to_abc_note(teoria.note('Eb,')), {
        "pitches": [{
            pitch: -5,
            verticalPos: -5,
            accidental: "flat"
        }]
    }, 'Eb, note');
});
test('f-note', function() {
    deepEqual(teoria_note_to_abc_note(teoria.note('f\'')), {
        "pitches": [{
            pitch: 17,
            verticalPos: 17,
            accidental: ""
        }]
    }, 'f\' note');
    deepEqual(teoria_note_to_abc_note(teoria.note('f')), {
        "pitches": [{
            pitch: 10,
            verticalPos: 10,
            accidental: ""
        }]
    }, 'f note');
    deepEqual(teoria_note_to_abc_note(teoria.note('f#')), {
        "pitches": [{
            pitch: 10,
            verticalPos: 10,
            accidental: "sharp"
        }]
    }, 'f# note');
    deepEqual(teoria_note_to_abc_note(teoria.note('F')), {
        "pitches": [{
            pitch: 3,
            verticalPos: 3,
            accidental: ""
        }]
    }, 'F note');
    deepEqual(teoria_note_to_abc_note(teoria.note('F,')), {
        "pitches": [{
            pitch: -4,
            verticalPos: -4,
            accidental: ""
        }]
    }, 'F, note');
    deepEqual(teoria_note_to_abc_note(teoria.note('Fb,')), {
        "pitches": [{
            pitch: -4,
            verticalPos: -4,
            accidental: "flat"
        }]
    }, 'Fb, note');
});
test('g-note', function() {
    deepEqual(teoria_note_to_abc_note(teoria.note('g\'')), {
        "pitches": [{
            pitch: 18,
            verticalPos: 18,
            accidental: ""
        }]
    }, 'g\' note');
    deepEqual(teoria_note_to_abc_note(teoria.note('g')), {
        "pitches": [{
            pitch: 11,
            verticalPos: 11,
            accidental: ""
        }]
    }, 'g note');
    deepEqual(teoria_note_to_abc_note(teoria.note('g#')), {
        "pitches": [{
            pitch: 11,
            verticalPos: 11,
            accidental: "sharp"
        }]
    }, 'g# note');
    deepEqual(teoria_note_to_abc_note(teoria.note('G')), {
        "pitches": [{
            pitch: 4,
            verticalPos: 4,
            accidental: ""
        }]
    }, 'G note');
    deepEqual(teoria_note_to_abc_note(teoria.note('G,')), {
        "pitches": [{
            pitch: -3,
            verticalPos: -3,
            accidental: ""
        }]
    }, 'G, note');
    deepEqual(teoria_note_to_abc_note(teoria.note('Gb,')), {
        "pitches": [{
            pitch: -3,
            verticalPos: -3,
            accidental: "flat"
        }]
    }, 'Gb, note');
});
test('a-note', function() {
    deepEqual(teoria_note_to_abc_note(teoria.note('a\'')), {
        "pitches": [{
            pitch: 19,
            verticalPos: 19,
            accidental: ""
        }]
    }, 'a\' note');
    deepEqual(teoria_note_to_abc_note(teoria.note('a')), {
        "pitches": [{
            pitch: 12,
            verticalPos: 12,
            accidental: ""
        }]
    }, 'a note');
    deepEqual(teoria_note_to_abc_note(teoria.note('a#')), {
        "pitches": [{
            pitch: 12,
            verticalPos: 12,
            accidental: "sharp"
        }]
    }, 'a# note');
    deepEqual(teoria_note_to_abc_note(teoria.note('A')), {
        "pitches": [{
            pitch: 5,
            verticalPos: 5,
            accidental: ""
        }]
    }, 'A note');
    deepEqual(teoria_note_to_abc_note(teoria.note('A,')), {
        "pitches": [{
            pitch: -2,
            verticalPos: -2,
            accidental: ""
        }]
    }, 'A, note');
    deepEqual(teoria_note_to_abc_note(teoria.note('Ab,')), {
        "pitches": [{
            pitch: -2,
            verticalPos: -2,
            accidental: "flat"
        }]
    }, 'Ab, note');
});
test('b-note', function() {
    deepEqual(teoria_note_to_abc_note(teoria.note('b\'')), {
        "pitches": [{
            pitch: 20,
            verticalPos: 20,
            accidental: ""
        }]
    }, 'b\' note');
    deepEqual(teoria_note_to_abc_note(teoria.note('b')), {
        "pitches": [{
            pitch: 13,
            verticalPos: 13,
            accidental: ""
        }]
    }, 'b note');
    deepEqual(teoria_note_to_abc_note(teoria.note('b#')), {
        "pitches": [{
            pitch: 13,
            verticalPos: 13,
            accidental: "sharp"
        }]
    }, 'b# note');
    deepEqual(teoria_note_to_abc_note(teoria.note('B')), {
        "pitches": [{
            pitch: 6,
            verticalPos: 6,
            accidental: ""
        }]
    }, 'B note');
    deepEqual(teoria_note_to_abc_note(teoria.note('B,')), {
        "pitches": [{
            pitch: -1,
            verticalPos: -1,
            accidental: ""
        }]
    }, 'B, note');
    deepEqual(teoria_note_to_abc_note(teoria.note('Bb,')), {
        "pitches": [{
            pitch: -1,
            verticalPos: -1,
            accidental: "flat"
        }]
    }, 'Bb, note');

});

module('key_signature_from_teoria_key');
test('default', function() {
    var clef = create_clef("treble");

    deepEqual(key_signature_from_teoria_key('C', clef), create_key_signature("CM"));
    deepEqual(key_signature_from_teoria_key('C#', clef), create_key_signature("C#M"));
    deepEqual(key_signature_from_teoria_key('D', clef), create_key_signature("DM"));
    deepEqual(key_signature_from_teoria_key('D#', clef), create_key_signature("EbM"));
    deepEqual(key_signature_from_teoria_key('E', clef), create_key_signature("EM"));
    deepEqual(key_signature_from_teoria_key('F', clef), create_key_signature("FM"));
    deepEqual(key_signature_from_teoria_key('F#', clef), create_key_signature("F#M"));
    deepEqual(key_signature_from_teoria_key('G', clef), create_key_signature("GM"));
    deepEqual(key_signature_from_teoria_key('G#', clef), create_key_signature("AbM"));
    deepEqual(key_signature_from_teoria_key('A', clef), create_key_signature("AM"));
    deepEqual(key_signature_from_teoria_key('A#', clef), create_key_signature("BbM"));
    deepEqual(key_signature_from_teoria_key('B', clef), create_key_signature("BM"));


});

module('transpose_key');
test('Perfect interval', function() {

    var clef = create_clef("treble");
    var current_key_signature = create_key_signature("CM");

    deepEqual(transpose_key("C", clef, teoria.interval('P1')), create_key_signature("CM"), 'Test transpose key C with P1 to CM');
    deepEqual(transpose_key("C", clef, teoria.interval('P4')), create_key_signature("FM"), 'Test transpose key C with P4 to FM');
    deepEqual(transpose_key("C", clef, teoria.interval('P5')), create_key_signature("GM"), 'Test transpose key C with P5 to BbM');
    deepEqual(transpose_key("C", clef, teoria.interval('P8')), create_key_signature("CM"), 'Test transpose key C with P8 to EbM');
});
test('Major interval', function() {

    var clef = create_clef("treble");
    var current_key_signature = create_key_signature("CM");

    deepEqual(transpose_key("C", clef, teoria.interval('M2')), create_key_signature("DM"), 'Test transpose key C with M2 to DM');
    deepEqual(transpose_key("C", clef, teoria.interval('M3')), create_key_signature("EM"), 'Test transpose key C with M3 to EM');
    deepEqual(transpose_key("C", clef, teoria.interval('M6')), create_key_signature("AM"), 'Test transpose key C with M6 to AM');
    deepEqual(transpose_key("C", clef, teoria.interval('M7')), create_key_signature("BM"), 'Test transpose key C with M7 to BM');

});
test('Minor interval', function() {

    var clef = create_clef("treble");
    var current_key_signature = create_key_signature("CM");

    deepEqual(transpose_key("C", clef, teoria.interval('m2')), create_key_signature("DbM"), 'Test transpose key C with m2 to DbM');
    deepEqual(transpose_key("C", clef, teoria.interval('m3')), create_key_signature("EbM"), 'Test transpose key C with m3 to EbM');
    deepEqual(transpose_key("C", clef, teoria.interval('m6')), create_key_signature("AbM"), 'Test transpose key C with m6 to AbM');
    deepEqual(transpose_key("C", clef, teoria.interval('m7')), create_key_signature("BbM"), 'Test transpose key C with m7 to BbM');
});
test('Augmented interval', function() {

    var clef = create_clef("treble");
    var current_key_signature = create_key_signature("CM");

    deepEqual(transpose_key("C", clef, teoria.interval('A1')), create_key_signature("C#M"), 'Test transpose key C with A1 to C#M');
    deepEqual(transpose_key("C", clef, teoria.interval('A2')), create_key_signature("EbM"), 'Test transpose key C with A2 to EbM');
    deepEqual(transpose_key("C", clef, teoria.interval('A3')), create_key_signature("FM"), 'Test transpose key C with A3 to FM');
    deepEqual(transpose_key("C", clef, teoria.interval('A4')), create_key_signature("F#M"), 'Test transpose key C with A4 to F#M');
    deepEqual(transpose_key("C", clef, teoria.interval('A5')), create_key_signature("AbM"), 'Test transpose key C with A5 to AbM');
    deepEqual(transpose_key("C", clef, teoria.interval('A6')), create_key_signature("BbM"), 'Test transpose key C with A6 to BbM');
    deepEqual(transpose_key("C", clef, teoria.interval('A7')), create_key_signature("CM"), 'Test transpose key C with A7 to CM');
    deepEqual(transpose_key("C", clef, teoria.interval('A8')), create_key_signature("C#M"), 'Test transpose key C with A8 to C#M');
});
test('Diminished interval', function() {

    var clef = create_clef("treble");
    var current_key_signature = create_key_signature("CM");

    /* Currently transpose_key does not transpose to double flat scales */
    deepEqual(transpose_key("C", clef, teoria.interval('d1')), create_key_signature("CbM"), 'Test transpose key C with d1 to CbM');
    /*deepEqual(transpose_key("C", clef, teoria.interval('d2')), create_key_signature("AM"), 'Test transpose key C with d2 to EbM');
    deepEqual(transpose_key("C", clef, teoria.interval('d3')), create_key_signature("FM"), 'Test transpose key C with d3 to FM');
    deepEqual(transpose_key("C", clef, teoria.interval('d4')), create_key_signature("F#M"), 'Test transpose key C with d4 to F#M');
    deepEqual(transpose_key("C", clef, teoria.interval('d5')), create_key_signature("AbM"), 'Test transpose key C with d5 to AbM');
    deepEqual(transpose_key("C", clef, teoria.interval('d6')), create_key_signature("BbM"), 'Test transpose key C with d6 to BbM');
    deepEqual(transpose_key("C", clef, teoria.interval('d7')), create_key_signature("CM"), 'Test transpose key C with d7 to CM');*/
    deepEqual(transpose_key("C", clef, teoria.interval('d8')), create_key_signature("CbM"), 'Test transpose key C with d8 to C#M');
});



module('transpose_note');
test('Perfect', function() {

    var test_set = [{
        interval: 'P1',
        pitch: 0,
        accidental: '',
        text_pitch: 'Transpose a C note a perfect first up results in C note',
        text_acc: 'Transpose a C note a perfect first up results in no accidental'
    }, {
        interval: 'P4',
        pitch: 3,
        accidental: '',
        text_pitch: 'Transpose a C note a perfect fourth up results in F note',
        text_acc: 'Transpose a C note a perfect fourth up results in no accidental'
    }, {
        interval: 'P5',
        pitch: 4,
        accidental: '',
        text_pitch: 'Transpose a C note a perfect fifth up results in G note',
        text_acc: 'Transpose a C note a perfect fifth up results in no accidental'
    }, {
        interval: 'P8',
        pitch: 7,
        accidental: '',
        text_pitch: 'Transpose a C note a perfect eighth up results in C note',
        text_acc: 'Transpose a C note a perfect eighth up results in no accidental'
    }];

    test_set.forEach(function(set) {

        var note = create_note();
        var clef = create_clef("treble");

        var current_key_signature = create_key_signature("CM");

        var intv = teoria.interval(set.interval);
        var transposed_key_signature = transpose_key("C", clef, intv);
        var transposed_note = transpose_note(note, intv, current_key_signature, transposed_key_signature);

        deepEqual(transposed_note.pitches[0].pitch, set.pitch, set.text_pitch);
        deepEqual(transposed_note.pitches[0].accidental, set.accidental, set.text_acc);
    });
});

test('Major', function() {

    var test_set = [{
        interval: 'M2',
        pitch: 1,
        accidental: '',
        text_pitch: 'Transpose a C note a major second up results in D note',
        text_acc: 'Transpose a C note a major second up results in no accidental'
    }, {
        interval: 'M3',
        pitch: 2,
        accidental: '',
        text_pitch: 'Transpose a C note a major third up results in E note',
        text_acc: 'Transpose a C note a major third up results in no accidental'
    }, {
        interval: 'M6',
        pitch: 5,
        accidental: '',
        text_pitch: 'Transpose a C note a major sixth up results in G note',
        text_acc: 'Transpose a C note a major sixth up results in no accidental'
    }, {
        interval: 'M7',
        pitch: 6,
        accidental: '',
        text_pitch: 'Transpose a C note a major seventh up results in B note',
        text_acc: 'Transpose a C note a major seventh up results in no accidental'
    }];

    test_set.forEach(function(set) {

        var note = create_note();
        var clef = create_clef("treble");

        var current_key_signature = create_key_signature("CM");

        var intv = teoria.interval(set.interval);
        var transposed_note = transpose_note(note, intv, current_key_signature, current_key_signature);

        deepEqual(transposed_note.pitches[0].pitch, set.pitch, set.text_pitch);
        deepEqual(transposed_note.pitches[0].accidental, set.accidental, set.text_acc);
    });
});

test('Minor', function() {

    var test_set = [{
        interval: 'm2',
        pitch: 1,
        accidental: 'flat',
        text_pitch: 'Transpose a C note a minor second up results in D note',
        text_acc: 'Transpose a C note a minor second up results in a flat accidental'
    }, {
        interval: 'm3',
        pitch: 2,
        accidental: 'flat',
        text_pitch: 'Transpose a C note a minor third up results in E note',
        text_acc: 'Transpose a C note a minor third up results in a flat accidental'
    }, {
        interval: 'm6',
        pitch: 5,
        accidental: 'flat',
        text_pitch: 'Transpose a C note a minor sixth up results in A note',
        text_acc: 'Transpose a C note a minor sixth up results in a flat accidental'
    }, {
        interval: 'm7',
        pitch: 6,
        accidental: 'flat',
        text_pitch: 'Transpose a C note a minor seventh up results in B note',
        text_acc: 'Transpose a C note a minor seventh up results in a flat accidental'
    }];

    test_set.forEach(function(set) {

        var note = create_note();
        var clef = create_clef("treble");

        var current_key_signature = create_key_signature("CM");

        var intv = teoria.interval(set.interval);
        var transposed_note = transpose_note(note, intv, current_key_signature, current_key_signature);

        deepEqual(transposed_note.pitches[0].pitch, set.pitch, set.text_pitch);
        deepEqual(transposed_note.pitches[0].accidental, set.accidental, set.text_acc);
    });
});

test('Augmented', function() {

    var test_set = [{
        interval: 'A1',
        pitch: 0,
        accidental: 'sharp',
        text_pitch: 'Transpose a C note a augmented first up results in C note',
        text_acc: 'Transpose a C note a augmented first up results in a sharp accidental'
    }, {
        interval: 'A2',
        pitch: 1,
        accidental: 'sharp',
        text_pitch: 'Transpose a C note a augmented second up results in D note',
        text_acc: 'Transpose a C note a augmented second up results in a sharp accidental'
    }, {
        interval: 'A3',
        pitch: 2,
        accidental: 'sharp',
        text_pitch: 'Transpose a C note a augmented third up results in E note',
        text_acc: 'Transpose a C note a augmented third up results in a sharp accidental'
    }, {
        interval: 'A4',
        pitch: 3,
        accidental: 'sharp',
        text_pitch: 'Transpose a C note a augmented fourth up results in F note',
        text_acc: 'Transpose a C note a augmented fourth up results in a sharp accidental'
    }, {
        interval: 'A5',
        pitch: 4,
        accidental: 'sharp',
        text_pitch: 'Transpose a C note a augmented fifth up results in G note',
        text_acc: 'Transpose a C note a augmented fifth up results in a sharp accidental'
    }, {
        interval: 'A6',
        pitch: 5,
        accidental: 'sharp',
        text_pitch: 'Transpose a C note a augmented sixth up results in A note',
        text_acc: 'Transpose a C note a augmented sixth up results in a sharp accidental'
    }, {
        interval: 'A7',
        pitch: 6,
        accidental: 'sharp',
        text_pitch: 'Transpose a C note a augmented seventh up results in B note',
        text_acc: 'Transpose a C note a augmented seventh up results in a sharp accidental'
    }];

    test_set.forEach(function(set) {

        var note = create_note();
        var clef = create_clef("treble");

        var current_key_signature = create_key_signature("CM");

        var intv = teoria.interval(set.interval);
        var transposed_note = transpose_note(note, intv, current_key_signature, current_key_signature);

        deepEqual(transposed_note.pitches[0].pitch, set.pitch, set.text_pitch);
        deepEqual(transposed_note.pitches[0].accidental, set.accidental, set.text_acc);
    });
});

test('Diminished', function() {

    var test_set = [{
        interval: 'd1',
        pitch: 0,
        accidental: 'flat',
        text_pitch: 'Transpose a C note a diminished first up results in C note',
        text_acc: 'Transpose a C note a diminished first up results in a flat accidental'
    }, {
        interval: 'd2',
        pitch: 1,
        accidental: 'dblflat',
        text_pitch: 'Transpose a C note a diminished second up results in D note',
        text_acc: 'Transpose a C note a diminished second up results in a dblflat accidental'
    }, {
        interval: 'd3',
        pitch: 2,
        accidental: 'dblflat',
        text_pitch: 'Transpose a C note a diminished third up results in E note',
        text_acc: 'Transpose a C note a diminished third up results in a flat accidental'
    }, {
        interval: 'd4',
        pitch: 3,
        accidental: 'flat',
        text_pitch: 'Transpose a C note a diminished fourth up results in F note',
        text_acc: 'Transpose a C note a diminished fourth up results in a flat accidental'
    }, {
        interval: 'd5',
        pitch: 4,
        accidental: 'flat',
        text_pitch: 'Transpose a C note a diminished fifth up results in G note',
        text_acc: 'Transpose a C note a diminished fifth up results in a flat accidental'
    }, {
        interval: 'd6',
        pitch: 5,
        accidental: 'dblflat',
        text_pitch: 'Transpose a C note a diminished sixth up results in A note',
        text_acc: 'Transpose a C note a diminished sixth up results in a dblflat accidental'
    }, {
        interval: 'd7',
        pitch: 6,
        accidental: 'dblflat',
        text_pitch: 'Transpose a C note a diminished seventh up results in B note',
        text_acc: 'Transpose a C note a diminished seventh up results in a dblflat accidental'
    }];

    test_set.forEach(function(set) {

        var note = create_note();
        var clef = create_clef("treble");

        var current_key_signature = create_key_signature("CM");

        var intv = teoria.interval(set.interval);
        var transposed_note = transpose_note(note, intv, current_key_signature, current_key_signature);

        deepEqual(transposed_note.pitches[0].pitch, set.pitch, set.text_pitch);
        deepEqual(transposed_note.pitches[0].accidental, set.accidental, set.text_acc);
    });
});

module('parse key signature');
test('Major', function() {

    equal(parse_key_signature(create_key_signature('CM')), 'CM', 'Cmaj returns CM');
    equal(parse_key_signature(create_key_signature('GM')), 'GM', 'Gmaj returns GM');
    equal(parse_key_signature(create_key_signature('DM')), 'DM', 'Dmaj returns DM');
});

test('Minor', function() {
    equal(parse_key_signature(create_key_signature('Am')), 'CM', 'Amin returns CM');
    equal(parse_key_signature(create_key_signature('Dm')), 'FM', 'Dmin returns FM');
    equal(parse_key_signature(create_key_signature('Gm')), 'BbM', 'Gmin returns BbM');
});

module('add_acc_from_key_signature');
test('flats', function() {

    var key_signature = create_key_signature('CbM');

    var test_set = [{
        pitch: 3,
        acc_in: '',
        acc_expected: '',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Accidental should be unchanged'
    }, {
        pitch: 6,
        acc_in: '',
        acc_expected: 'flat',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be added'
    }, {
        pitch: 9,
        acc_in: '',
        acc_expected: 'flat',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be added'
    }, {
        pitch: 5,
        acc_in: '',
        acc_expected: 'flat',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be added'
    }, {
        pitch: 8,
        acc_in: '',
        acc_expected: 'flat',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be added'
    }, {
        pitch: 4,
        acc_in: '',
        acc_expected: 'flat',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be added'
    }, {
        pitch: 7,
        acc_in: '',
        acc_expected: 'flat',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be added'
    }, {
        pitch: 10,
        acc_in: '',
        acc_expected: 'flat',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be added'
    }];

    test_set.forEach(function(set) {

        var note = create_note(set.pitch, set.acc_in);
        add_acc_from_key_signature(note, key_signature);

        deepEqual(note.pitches[0].pitch, set.pitch, set.text_pitch);
        deepEqual(note.pitches[0].accidental, set.acc_expected, set.text_acc);
    });
});

test('dblflats', function() {

    var key_signature = create_key_signature('CbM');

    var test_set = [{
        pitch: 3,
        acc_in: 'flat',
        acc_expected: 'flat',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be unchanged'
    }, {
        pitch: 6,
        acc_in: 'flat',
        acc_expected: 'dblflat',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be added'
    }, {
        pitch: 9,
        acc_in: 'flat',
        acc_expected: 'dblflat',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be added'
    }, {
        pitch: 5,
        acc_in: 'flat',
        acc_expected: 'dblflat',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be added'
    }, {
        pitch: 8,
        acc_in: 'flat',
        acc_expected: 'dblflat',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be added'
    }, {
        pitch: 4,
        acc_in: 'flat',
        acc_expected: 'dblflat',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be added'
    }, {
        pitch: 7,
        acc_in: 'flat',
        acc_expected: 'dblflat',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be added'
    }, {
        pitch: 10,
        acc_in: 'flat',
        acc_expected: 'dblflat',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be added'
    }];

    test_set.forEach(function(set) {

        var note = create_note(set.pitch, set.acc_in);
        add_acc_from_key_signature(note, key_signature);

        deepEqual(note.pitches[0].pitch, set.pitch, set.text_pitch);
        deepEqual(note.pitches[0].accidental, set.acc_expected, set.text_acc);
    });
});

test('sharps', function() {

    var key_signature = create_key_signature('C#M');

    var test_set = [{
        pitch: 4,
        acc_in: '',
        acc_expected: '',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'No accidental should be added'
    }, {
        pitch: 10,
        acc_in: '',
        acc_expected: 'sharp',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be added'
    }, {
        pitch: 7,
        acc_in: '',
        acc_expected: 'sharp',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be added'
    }, {
        pitch: 11,
        acc_in: '',
        acc_expected: 'sharp',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be added'
    }, {
        pitch: 8,
        acc_in: '',
        acc_expected: 'sharp',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be added'
    }, {
        pitch: 5,
        acc_in: '',
        acc_expected: 'sharp',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be added'
    }, {
        pitch: 9,
        acc_in: '',
        acc_expected: 'sharp',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be added'
    }, {
        pitch: 6,
        acc_in: '',
        acc_expected: 'sharp',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be added'
    }];

    test_set.forEach(function(set) {

        var note = create_note(set.pitch, set.acc_in);
        add_acc_from_key_signature(note, key_signature);

        deepEqual(note.pitches[0].pitch, set.pitch, set.text_pitch);
        deepEqual(note.pitches[0].accidental, set.acc_expected, set.text_acc);
    });

});

test('dblsharps', function() {

    var key_signature = create_key_signature('C#M');

    var test_set = [{
        pitch: 4,
        acc_in: 'sharp',
        acc_expected: 'sharp',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be unchanged'
    }, {
        pitch: 10,
        acc_in: 'sharp',
        acc_expected: 'dblsharp',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be added'
    }, {
        pitch: 7,
        acc_in: 'sharp',
        acc_expected: 'dblsharp',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be added'
    }, {
        pitch: 11,
        acc_in: 'sharp',
        acc_expected: 'dblsharp',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be added'
    }, {
        pitch: 8,
        acc_in: 'sharp',
        acc_expected: 'dblsharp',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be added'
    }, {
        pitch: 5,
        acc_in: 'sharp',
        acc_expected: 'dblsharp',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be added'
    }, {
        pitch: 9,
        acc_in: 'sharp',
        acc_expected: 'dblsharp',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be added'
    }, {
        pitch: 6,
        acc_in: 'sharp',
        acc_expected: 'dblsharp',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be added'
    }];

    test_set.forEach(function(set) {

        var note = create_note(set.pitch, set.acc_in);
        add_acc_from_key_signature(note, key_signature);

        deepEqual(note.pitches[0].pitch, set.pitch, set.text_pitch);
        deepEqual(note.pitches[0].accidental, set.acc_expected, set.text_acc);
    });

});


module('remove_acc_from_key_signature');
test('flats', function() {

    var key_signature = create_key_signature('CbM');

    var test_set = [{
        pitch: 3,
        acc_in: 'flat',
        acc_expected: 'flat',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Accidental should be unchanged'
    }, {
        pitch: 6,
        acc_in: 'flat',
        acc_expected: '',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be removed'
    }, {
        pitch: 9,
        acc_in: 'flat',
        acc_expected: '',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be removed'
    }, {
        pitch: 5,
        acc_in: 'flat',
        acc_expected: '',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be removed'
    }, {
        pitch: 8,
        acc_in: 'flat',
        acc_expected: '',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be removed'
    }, {
        pitch: 4,
        acc_in: 'flat',
        acc_expected: '',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be removed'
    }, {
        pitch: 7,
        acc_in: 'flat',
        acc_expected: '',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be removed'
    }, {
        pitch: 10,
        acc_in: 'flat',
        acc_expected: '',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Flat accidental should be removed'
    }];

    test_set.forEach(function(set) {

        var note = create_note(set.pitch, set.acc_in);
        remove_acc_from_key_signature(note, key_signature);

        deepEqual(note.pitches[0].pitch, set.pitch, set.text_pitch);
        deepEqual(note.pitches[0].accidental, set.acc_expected, set.text_acc);
    });
});

test('sharps', function() {

    var key_signature = create_key_signature('C#M');

    var test_set = [{
        pitch: 4,
        acc_in: 'sharp',
        acc_expected: 'sharp',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Accidental should be unchanged'
    }, {
        pitch: 10,
        acc_in: 'sharp',
        acc_expected: '',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be removed'
    }, {
        pitch: 7,
        acc_in: 'sharp',
        acc_expected: '',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be removed'
    }, {
        pitch: 11,
        acc_in: 'sharp',
        acc_expected: '',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be removed'
    }, {
        pitch: 8,
        acc_in: 'sharp',
        acc_expected: '',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be removed'
    }, {
        pitch: 5,
        acc_in: 'sharp',
        acc_expected: '',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be removed'
    }, {
        pitch: 9,
        acc_in: 'sharp',
        acc_expected: '',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be removed'
    }, {
        pitch: 6,
        acc_in: 'sharp',
        acc_expected: '',
        text_pitch: 'Pitch should be unchanged',
        text_acc: 'Sharp accidental should be removed'
    }];

    test_set.forEach(function(set) {

        var note = create_note(set.pitch, set.acc_in);
        remove_acc_from_key_signature(note, key_signature);

        deepEqual(note.pitches[0].pitch, set.pitch, set.text_pitch);
        deepEqual(note.pitches[0].accidental, set.acc_expected, set.text_acc);
    });
});