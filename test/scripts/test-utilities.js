

note_to_pitch = function(note) {
    var pitches = "cdefgabCDEFGAB";

    return pitches.indexOf(note);
}; 


pitch_to_note = function(pitch) {
    var notes = "cdefgabCDEFGAB";

    return notes[pitch];
}; 

create_note = function(pitch, accidental, duration) {

    pitch = typeof pitch !== 'undefined' ? pitch : 0;
    if (typeof pitch == 'string' || pitch instanceof String) {
        pitch = note_to_pitch(pitch)
    }

    accidental = typeof accidental !== 'undefined' ? accidental : "";
    duration = typeof duration !== 'undefined' ? duration : 0.5;

    var abc_note = {
        "pitches": [{
            "pitch": pitch,
            "verticalPos": pitch,
            "accidental": accidental
        }],
        "duration": duration,
        "el_type": "note",
        "startChar": 1,
        "endChar": 2,
        "averagepitch": pitch,
        "minpitch": pitch,
        "maxpitch": pitch
    };

    return abc_note;
};

create_clef = function(type) {

    var clef;
    switch (type) {
        default:
        case "treble":

            clef = {
                "type": "treble",
                "verticalPos": 0
            };
            break;
    }
    return clef;
};

create_key_signature = function(key) {

    var key_signature = null;
    switch (key) {
        case 'CbM':
        case 'Abm':
            key_signature = {
                "accidentals": [{
                    "acc": "flat",
                    "note": "B",
                    "verticalPos": 6
                }, {
                    "acc": "flat",
                    "note": "e",
                    "verticalPos": 9
                }, {
                    "acc": "flat",
                    "note": "A",
                    "verticalPos": 5
                }, {
                    "acc": "flat",
                    "note": "d",
                    "verticalPos": 8
                }, {
                    "acc": "flat",
                    "note": "G",
                    "verticalPos": 4
                }, {
                    "acc": "flat",
                    "note": "c",
                    "verticalPos": 7
                }, {
                    "acc": "flat",
                    "note": "f",
                    "verticalPos": 10
                }]
            };
            break;
        case 'GbM':
        case 'Ebm':
            key_signature = {
                "accidentals": [{
                    "acc": "flat",
                    "note": "B",
                    "verticalPos": 6
                }, {
                    "acc": "flat",
                    "note": "e",
                    "verticalPos": 9
                }, {
                    "acc": "flat",
                    "note": "A",
                    "verticalPos": 5
                }, {
                    "acc": "flat",
                    "note": "d",
                    "verticalPos": 8
                }, {
                    "acc": "flat",
                    "note": "G",
                    "verticalPos": 4
                }, {
                    "acc": "flat",
                    "note": "c",
                    "verticalPos": 7
                }]
            };
            break;
        case 'DbM':
        case 'Bbm':
            key_signature = {
                "accidentals": [{
                    "acc": "flat",
                    "note": "B",
                    "verticalPos": 6
                }, {
                    "acc": "flat",
                    "note": "e",
                    "verticalPos": 9
                }, {
                    "acc": "flat",
                    "note": "A",
                    "verticalPos": 5
                }, {
                    "acc": "flat",
                    "note": "d",
                    "verticalPos": 8
                }, {
                    "acc": "flat",
                    "note": "G",
                    "verticalPos": 4
                }]
            };
            break;
        case 'AbM':
        case 'Fm':
            key_signature = {
                "accidentals": [{
                    "acc": "flat",
                    "note": "B",
                    "verticalPos": 6
                }, {
                    "acc": "flat",
                    "note": "e",
                    "verticalPos": 9
                }, {
                    "acc": "flat",
                    "note": "A",
                    "verticalPos": 5
                }, {
                    "acc": "flat",
                    "note": "d",
                    "verticalPos": 8
                }]
            };
            break;
        case 'EbM':
        case 'Cm':
            key_signature = {
                "accidentals": [{
                    "acc": "flat",
                    "note": "B",
                    "verticalPos": 6
                }, {
                    "acc": "flat",
                    "note": "e",
                    "verticalPos": 9
                }, {
                    "acc": "flat",
                    "note": "A",
                    "verticalPos": 5
                }]
            };
            break;
        case 'BbM':
        case 'Gm':
            key_signature = {
                "accidentals": [{
                    "acc": "flat",
                    "note": "B",
                    "verticalPos": 6
                }, {
                    "acc": "flat",
                    "note": "e",
                    "verticalPos": 9
                }]
            };
            break;
        case 'FM':
        case 'Dm':
            key_signature = {
                "accidentals": [{
                    "acc": "flat",
                    "note": "B",
                    "verticalPos": 6
                }]
            };
            break;
        default:
        case 'CM':
        case 'Am':
            key_signature = {
                "accidentals": []
            };
            break;
        case 'GM':
        case 'Em':
            key_signature = {
                "accidentals": [{
                    "acc": "sharp",
                    "note": "f",
                    "verticalPos": 10
                }]
            };
            break;
        case 'DM':
        case 'Bm':
            key_signature = {
                "accidentals": [{
                    "acc": "sharp",
                    "note": "f",
                    "verticalPos": 10
                }, {
                    "acc": "sharp",
                    "note": "c",
                    "verticalPos": 7
                }]
            };
            break;
        case 'AM':
        case 'F#m':
            key_signature = {
                "accidentals": [{
                    "acc": "sharp",
                    "note": "f",
                    "verticalPos": 10
                }, {
                    "acc": "sharp",
                    "note": "c",
                    "verticalPos": 7
                }, {
                    "acc": "sharp",
                    "note": "g",
                    "verticalPos": 11
                }]
            };
            break;
        case 'EM':
        case 'a#m':
            key_signature = {
                "accidentals": [{
                    "acc": "sharp",
                    "note": "f",
                    "verticalPos": 10
                }, {
                    "acc": "sharp",
                    "note": "c",
                    "verticalPos": 7
                }, {
                    "acc": "sharp",
                    "note": "g",
                    "verticalPos": 11
                }, {
                    "acc": "sharp",
                    "note": "d",
                    "verticalPos": 8
                }]
            };
            break;
        case 'BM':
        case 'g#m':
            key_signature = {
                "accidentals": [{
                    "acc": "sharp",
                    "note": "f",
                    "verticalPos": 10
                }, {
                    "acc": "sharp",
                    "note": "c",
                    "verticalPos": 7
                }, {
                    "acc": "sharp",
                    "note": "g",
                    "verticalPos": 11
                }, {
                    "acc": "sharp",
                    "note": "d",
                    "verticalPos": 8
                }, {
                    "acc": "sharp",
                    "note": "A",
                    "verticalPos": 5
                }]
            };
            break;
        case 'F#M':
        case 'D#m':
            key_signature = {
                "accidentals": [{
                    "acc": "sharp",
                    "note": "f",
                    "verticalPos": 10
                }, {
                    "acc": "sharp",
                    "note": "c",
                    "verticalPos": 7
                }, {
                    "acc": "sharp",
                    "note": "g",
                    "verticalPos": 11
                }, {
                    "acc": "sharp",
                    "note": "d",
                    "verticalPos": 8
                }, {
                    "acc": "sharp",
                    "note": "A",
                    "verticalPos": 5
                }, {
                    "acc": "sharp",
                    "note": "e",
                    "verticalPos": 9
                }]
            };
            break;
        case 'C#M':
        case 'A#m':
            key_signature = {
                "accidentals": [{
                    "acc": "sharp",
                    "note": "f",
                    "verticalPos": 10
                }, {
                    "acc": "sharp",
                    "note": "c",
                    "verticalPos": 7
                }, {
                    "acc": "sharp",
                    "note": "g",
                    "verticalPos": 11
                }, {
                    "acc": "sharp",
                    "note": "d",
                    "verticalPos": 8
                }, {
                    "acc": "sharp",
                    "note": "A",
                    "verticalPos": 5
                }, {
                    "acc": "sharp",
                    "note": "e",
                    "verticalPos": 9
                }, {
                    "acc": "sharp",
                    "note": "B",
                    "verticalPos": 6
                }]
            };


    }

    return key_signature;
};


QUnit.assert.equal_notes = function( note, exp, exp_acc, message ) {

  var exp_pitch = exp;
  var exp_note = pitch_to_note(exp);

  if (typeof exp == 'string' || exp instanceof String) {
      exp_pitch = note_to_pitch(exp);
      exp_note = exp;
  }

  var act_pitch = note.pitches[0].pitch;
  var act_note  = pitch_to_note(note.pitches[0].pitch);
  var act_acc   = note.pitches[0].accidental;

  var act_note_str = act_note + " " + act_acc;
  var exp_note_str = exp_note + " " + exp_acc;

  this.push( (act_pitch==exp_pitch) && (act_acc==exp_acc),
             act_note_str, exp_note_str,
             "Equal notes: " + message);
};

test_transpose_note = function( clef, key, test_set ) {

    var clef_str = clef;
    var key_str = key;

    var clef = create_clef(clef);
    var current_key_signature = create_key_signature(key);

    test_set.forEach(function(set) {

        // Setup
        var note = create_note(set.input.note, set.input.acc);
        var intv = teoria.interval(set.interval);

        // Execute
        var transposed_note = RJ_transpose.note(note, intv, current_key_signature, current_key_signature);

        // Verify
        var msg = "Given a " + clef_str + " clef with key of " + key_str + ", transposing [" + set.input.note + " " + set.input.acc + "] with interval " + set.interval + " should result in [" + set.exp.note + " " + set.exp.acc + "]";
        QUnit.assert.equal_notes(transposed_note, set.exp.note, set.exp.acc, msg);
    });
};

test_teoria_note_to_abc = function( test_set ) {

    test_set.forEach(function(set) {

        deepEqual(RJ_teoria_abc_glue.teoria_note_to_abc_note(teoria.note(set.teoria_note)), {
            "pitches": [{
                pitch: set.abc.pitch,
                verticalPos: set.abc.pitch,
                accidental: set.abc.acc
            }]
        }, set.teoria_note + ' note');

    });

};

teoria_array_to_abc_array = function( in_array )
{
    var out_array = []

    in_array.forEach(function(note) {
         var teoria_note = teoria.note(note)
         var abc_note = RJ_teoria_abc_glue.teoria_note_to_abc_note(teoria_note)

         out_array.push( abc_note )
    });

    return out_array;
};

test_transpose_line = function( key, clef, from_line, interval, expected_line ) {

    // Setup
    var interval_str = interval
    var interval = teoria.interval(interval);

    var clef_str = clef;
    var clef = create_clef(clef);

    var current_key_signature = create_key_signature(key);
    var transposed_key_signature = RJ_transpose.key(key, clef, interval);

    var from_notes = teoria_array_to_abc_array( from_line )
    var expected_notes = teoria_array_to_abc_array( expected_line )

    // Exercise
    var transposed_line = RJ_transpose.line(from_notes, interval, current_key_signature, transposed_key_signature);

    // Verify
    equal( transposed_line.length, expected_notes.length);

    var i, len = transposed_line.length;
    for (i=0; i<len; ++i) {
        var msg = "Given " + clef_str + " clef in key of " + key + " transposing [" + from_line[i] + "] with interval " + interval_str + " should result in [" + expected_line[i] + "]"

        var exp_pitch = expected_notes[i].pitches[0].pitch
        var exp_acc   = expected_notes[i].pitches[0].accidental

        QUnit.assert.equal_notes(transposed_line[i],
                                 exp_pitch,
                                 exp_acc,
                                 msg);
    }
};
