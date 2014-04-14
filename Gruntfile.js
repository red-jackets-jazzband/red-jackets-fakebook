module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                eqeqeq: true,
                trailing: true,
                curly: true,
                indent: 4,
                latedef: true,
                undef: true,
                unused: true,
                maxparams: 4,
                maxdepth: 5,
                maxstatements: 30,
                maxcomplexity: 8,
                maxlen: 150,
                jquery: true,
                browser: true,
                predef: ["teoria", "Raphael", "ABCHeader", "ABCPrinter", "AbcTuneBook", "AbcParse", "console"]

            },
            target: {
                src: ['source/scripts/red-jackets*.js']
            },
        },
        natural_docs: {
            options: {
                bin: '/usr/bin/NaturalDocs',
                projects: '/opt/NaturalDocs/projects',
                format: 'HTML'
            },
            red_jackets: {
                project: '/RedJacketsFakebook',
                src: '/home/ben/Dropbox/Red\ Jackets/RedJacketsFakebook',
                output: '/docs',
                inputs: ['/source/scripts'],
            }
        },
        qunit: {
            all: ['test/tests.html']

        },

        copy: {
            build: {
                cwd: 'source',
                src: ['**'],
                dest: 'build',
                expand: true
            },
        },
        clean: {
            build: {
                src: ['build']
            },
            stylesheets: {
                src: ['build/css/*.css', 'build/css/fonts/*.css', '!build/red-jackets-fakebook.css']
            },
            scripts: {
                src: ['build/scripts/*.js', 'build/scripts/', '!build/red-jackets-fakebook.js']
            },
            zip: {
                src: ['red-jackets-fakebook.zip']
            },
            svgs: {
                src: ['build/images/svg/*.svg', 'build/images/svg/']
            },
            html: {
                src: ['build/index.html'] // Remove the htmls that are minified
            }
        },
        uglify: {
            build: {
                options: {
                    mangle: true,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files: {
                    'build/red-jackets-fakebook.min.js': ['build/scripts/*.js']
                }
            }
        },
        cssmin: {
            build: {
                files: {
                    'build/red-jackets-fakebook.css': ['build/css/*.css', 'build/css/fonts/*.css']
                }
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'red-jackets-fakebook.zip'
                },
                files: [{
                        expand: true,
                        cwd: 'build/',
                        src: ['**'],
                        dest: '.'
                    }, // includes files in path and its subdirs

                ]
            }
        },
        svgmin: { // Task
            options: { // Configuration that will be passed directly to SVGO
                plugins: [{
                    removeViewBox: false
                }, {
                    removeEmptyContainers: true
                }, {
                    removeEmptyText: true
                }, {
                    removeHiddenElems: true
                }, {
                    removeMetadata: true
                }, {
                    removeComments: true
                }, {
                    removeUselessStrokeAndFill: true
                }, {
                    mergePaths: true
                }, {
                    convertPathData: false
                }, {
                    convertShapeToPath: true
                }, {
                    convertColors: true
                }, {
                    removeEmptyAttrs: true

                }]
            },
            dist: { // Target
                files: [{ // Dictionary of files
                    expand: true, // Enable dynamic expansion.
                    cwd: 'build/images/svg', // Src matches are relative to this path.
                    src: ['*.svg'], // Actual pattern(s) to match.
                    dest: 'build/images', // Destination path prefix.
                    ext: '.min.svg' // Dest filepaths will have this extension.
                    // ie: optimise img/src/branding/logo.svg and store it in img/branding/logo.min.svg
                }]
            }
        },
        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files
                    'build/index.html': 'source/index.html', // 'destination': 'source'
                }
            },
        },

    });

    // Load the plugin that provides the "jshint" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-natural-docs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // Default task(s).
    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('export', ['natural_docs', 'clean:build', 'copy']);
    grunt.registerTask('scripts', ['uglify', 'clean:scripts']);
    grunt.registerTask('stylesheets', ['cssmin', 'clean:stylesheets']);
    grunt.registerTask('svgs', ['svgmin', 'clean:svgs']);
    grunt.registerTask('html', ['clean:html', 'htmlmin']);

    grunt.registerTask('default', ['test', 'export', 'scripts', 'stylesheets', 'svgs', 'html', 'clean:zip', 'compress']);

};