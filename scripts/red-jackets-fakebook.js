
var songs_folder = 'songs';

function parse_song_list(data) {

    var songs = data.split('\n');
    var number_of_songs = songs.length - 1

    for (var i = 0; i < number_of_songs; i++) {

        var song_name = songs[i].split(",")[0]
            var song_path = songs_folder + '/' + songs[i].split(",")[1]

            $("select#song_menu").append("<option value=" + song_path + ">" + song_name + " </option>");
    }
}

function render_song(path) {

    var padding = 25
    var printerParams = {
            scale: 1.0,
            staffwidth: get_width() - 2.2 * padding,
            paddingtop: padding,
            paddingbottom: padding,
            paddingright: padding,
            paddingleft: 0,
            editable: false
    }

    $.get(path, function(data) {
        ABCJS.renderAbc('notation', data, {}, printerParams);
        //ABCJS.renderMidi('midi', data, {}, {}, {})
        }, 'text');

    return false;
}

function get_width() {
    var ori = $(window).orientation;
    var width = (ori == 90 || ori == -90) ? $(window).height() : $(window).width();
    return width;
}

function transpose_song(path, key) {
    $.get(path, function(data) {
            alert(t3976)
            SPOCK.run(t3976);
            //var result = transpose(path, key);
            alert('done');
        }, 'text');

    return false;
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

    var keys = ['Ab','A','A#','Bb','B','B#','Cb','C','C#','Db','D','D#','Eb','E','E#','Fb','F','F#','Gb','G','G#'];

    for (var i = 0; i < keys.length; i++) {
        $("select#transpose_menu").append("<option value=" + keys[i] + ">" + keys[i] + " </option>");
    }
}

function subscribe_to_events() {

    // Event handler when different song is selected
    $("select").bind("change", function(event) {

        var id = this.id;

        if( id == "song_menu") {
            render_song($(this).val());
        }

        if( id == "transpose_menu") {
            var current_song = $("select#song_menu").val();
            var key = $(this).val();
            transpose_song(current_song, key);
        }
    });

    // Event handler window resize event
    $(window).bind('resize', function(e) {
        render_song($("select#song_menu").val());
    });

}

function init() {
    create_nav_bars();
    subscribe_to_events();
    load_songs();
    init_transpose_menu();
}