module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'src/lib/*.js',
                    'src/stage/js/timo.jquery.js'
                ],
                dest: 'src/build/js/timo.jquery.js',
            }
        },

        uglify: {
            build: {
                src: 'src/build/js/timo.jquery.js',
                dest: 'src/build/js/timo.jquery.min.js'
            }
        },

        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                    interrupt: true
                },
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify', 'watch']);

};
