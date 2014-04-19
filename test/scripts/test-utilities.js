create_note = function(pitch, accidental, duration) {

    pitch = typeof pitch !== 'undefined' ? pitch : 0;
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