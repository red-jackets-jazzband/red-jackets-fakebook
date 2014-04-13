module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                eqeqeq: true,
                trailing: true
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
                src: ['build/scripts/*.js', '!build/red-jackets-fakebook.js']
            },
        },
        uglify: {
            build: {
                options: {
                    mangle: false
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


    });

    // Load the plugin that provides the "jshint" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-natural-docs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('export', ['natural_docs', 'clean:build', 'copy']);
    grunt.registerTask('scripts', ['uglify', 'clean:scripts']);
    grunt.registerTask('stylesheets', ['cssmin', 'clean:stylesheets']);

    grunt.registerTask('default', ['test', 'export', 'scripts', 'stylesheets']);

};