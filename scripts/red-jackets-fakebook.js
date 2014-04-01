var songs_folder = 'songs';
var current_song = null;
var paper = null;
var printer = null;

var abcParser = null;

function parse_song_list(data) {

    var songs = data.split('\n');
    var number_of_songs = songs.length - 1

    for (var i = 0; i < number_of_songs; i++) {

        var song_name = songs[i].split(",")[0]
        var song_path = songs_folder + '/' + songs[i].split(",")[1]

        $("select#song_menu").append("<option value=" + song_path + ">" + song_name + " </option>");
    }
}

function init_render_stuff() {

    paper = Raphael('notation', 800, 400);
    printer = new ABCPrinter(paper);
}

function render_song(song_to_render) {

    paper.clear();
    printer.printABC(song_to_render);
}

function parse_string_to_abc_tune(text) {

    var tunebook = new AbcTuneBook(text);

    abcParser.parse(tunebook.tunes[0].abc); //TODO handle multiple tunes
    current_song = abcParser.getTune();

    console.dir(current_song)

    render_song(current_song);
}

function init_parsing_stuff() {

    var parserParams = {
        print: false, //pay attention to margins and other formatting commands that don't make sense in a web page
        header_only: false, //only parse the header
        stop_on_warning: false //only parse until the first warning is encountered
    }

    abcParser = new AbcParse(parserParams);
}

function parse_song(path) {

    $.get(path, parse_string_to_abc_tune, 'text');

}

function get_width() {
    var ori = $(window).orientation;
    var width = (ori == 90 || ori == -90) ? $(window).height() : $(window).width();
    return width;
}

function transpose_song(key) {

    // Get current key
    interval = teoria.interval('M2');

    for (var i = 0; i < current_song.lines.length; i++) {

        console.log("Transposing line" + i);
        var transposed_line = transpose_line(current_song.lines[i].staff[0].voices[0], interval);

        current_song.lines[i].staff[0].voices[0] = transposed_line;
    }
    return false;
}

function transpose_line(line, teoria_interval) {

    var transposed_line = []

    //    line_string = JSON.stringify(line);
    //  console.log(line_string)

    for (var i = 0; i < line.length; i++) {

        element = line[i];

        switch (element.el_type) {

            case "note":
                transposed_line.push(transpose_note(element, teoria_interval));
                break;
            case "chord":
                transposed_line.push(transpose_chord(element, teoria_interval));
                break;
            default:
                transposed_line.push(element);
                break;
        }
    }

    return transposed_line;
}

function transpose_chord(abc_chord, teoria_interval) {
    console.log("Transposing chord");
    return abc_chord;
}

function transpose_note(abc_note, teoria_interval) {

    console.log("Transposing note");

    // parse the note
    teoria_note = abc_note_to_teoria_note(abc_note);

    // transpose
    intv = teoria_interval.toString();
    transposed_note = teoria_note.interval(intv);
    transposed_abc_note = teoria_note_to_abc_note(transposed_note);

    //return it
    abc_note.pitches[0].pitch = transposed_abc_note.pitch;
    abc_note.pitches[0].accidental = transposed_abc_note.accidental;
    abc_note.pitches[0].verticalPos = transposed_abc_note.verticalPos;

    abc_note.averagepitch = transposed_abc_note.pitch;
    abc_note.minpitch = transposed_abc_note.pitch;
    abc_note.maxpitch = transposed_abc_note.pitch;

    console.log(JSON.stringify(abc_note));

    return abc_note;
}

function get_key_using_accidentals(accidentals) {

    return key
}


function teoria_note_to_abc_note(teoria_note) {

    var teoria_to_abc_pitches = "cdefgab";

    var pitch = teoria_to_abc_pitches.indexOf(teoria_note.name());

    var center_octave = 2;
    var notes_per_octave = 7;
    pitch += notes_per_octave * (teoria_note.octave() - center_octave);

    var accidental = "";
    switch (teoria_note.accidental()) {
        case "x":
            accidental = "dblsharp";
            break;
        case "#":
            accidental = "sharp";
            break;
        case "b":
            accidental = "flat";
            break;
        case "bb":
            accidental = "dblflat";
            break;
        default:
            accidental = "";
            break;
    }

    return {
        "pitch": pitch,
        "verticalPos": pitch,
        "accidental": accidental
    }
}

function teoria_duration_to_abc_duration(teoria_duration) {

    var abc_duration = 1.0 / teoria_duration.value;

    var dots = teoria_duration.dots;
    var half = abc_duration;

    while (dots > 0) {
        dots -= 1;
        half = half / 2;
        abc_duration += half;
    }

    return abc_duration;
}


function abc_note_to_teoria_note(abc_note) {

    var pitches = {
        5: "A",
        6: "B",
        0: "C",
        1: "D",
        2: "E",
        3: "F",
        4: "G",
        12: "a",
        13: "b",
        7: "c",
        8: "d",
        9: "e",
        10: "f",
        11: "g"
    };

    var abc_root_note = abc_note.pitches[0].pitch;
    var string_root_note = pitches[abc_root_note];

    var string_root_note = add_accidental_to_string(string_root_note, abc_note)

    var teoria_duration = abc_duration_to_teoria_duration(abc_note.abc_duration);

    return new teoria.note(string_root_note, teoria_duration)
}

function abc_duration_to_teoria_duration(abc_duration) {

    var inv_duration = 1.0 / abc_duration;

    var undotted_power = Math.ceil(Math.log2(inv_duration));
    var undotted_duration = Math.pow(2, undotted_power);

    var remaining_duration = abc_duration - 1.0 / undotted_duration;

    var dots = 0;
    var half = 1.0 / undotted_duration;

    while (remaining_duration > 0.0) {
        half = half / 2;

        dots += 1;
        remaining_duration -= half;
    }

    return {
        "value": undotted_duration,
        "dots": dots
    }
}

function add_accidental_to_string(str_note, abc_note) {

    var accidentals = {
        "sharp": "#",
        "dblsharp": "x",
        "natural": "",
        "flat": "b",
        "dblflat": "bb"
    }
    var teoria_root_note_accidental = "";

    var abc_root_note_accidental = abc_note.pitches[0].accidental

    if (abc_root_note_accidental) {
        teoria_root_note_accidental = accidentals[abc_root_note_accidental]
    }

    //Insert accidental into string after note name and return
    return str_note.substring(0, 1) + teoria_root_note_accidental + str_note.substring(1, str_note.length);
}

function create_nav_bars() {
    $("#navbar").navbar();
    $("#navbar_settings_page").navbar();
    $("#navbar_help_page").navbar();
    $("#navbar_search_page").navbar();
}

function load_songs() {
    $.get('songs/_index_of_songs.txt', parse_song_list, 'text');
}

function init_transpose_menu() {

    var keys = ['Ab', 'A', 'A#', 'Bb', 'B', 'B#', 'Cb', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'E#', 'Fb', 'F', 'F#', 'Gb', 'G', 'G#'];

    for (var i = 0; i < keys.length; i++) {
        $("select#transpose_menu").append("<option value=" + keys[i] + ">" + keys[i] + " </option>");
    }
}

function subscribe_to_events() {

    // Event handler when different song is selected
    $("select").bind("change", select_menu_event_handler);

    // Event handler window resize event
    $(window).bind('resize', function(e) {
        console.log('render song called from resize');
        render_song();
    });

}

function select_menu_event_handler(event) {
    var id = this.id;

    if (id == "song_menu") {
        song_path = $("select#song_menu").val();
        parse_song(song_path);
    }

    if (id == "transpose_menu") {
        var key = $(this).val();
        transpose_song(key);
        render_song(current_song);
    }
}

function init() {
    create_nav_bars();
    subscribe_to_events();
    load_songs();

    init_transpose_menu();
    init_parsing_stuff();
    init_render_stuff();

    parse_song($("select#song_menu").val());
}