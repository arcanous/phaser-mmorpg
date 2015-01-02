/*global module:false*/
module.exports = function(grunt) {

    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        meta: {
            version: '0.2.0'
        },
        banner: '/*! PhaserMMORPG - v<%= meta.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* http://mmorpg.astrocity.lv/\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
            'YOUR_NAME; Licensed MIT */\n',
        // Task configuration.
        concat: {
            main: {
                src: ['js/**/*.js', '!js/lib/**/*.js'],
                dest: 'build/PhaserMMORPG.concat.js'
            }
        },
        jshint: {
            main : ['js/**/*.js', '!js/lib/**/*.js'],
            options: {
                browser: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                forin: true,
                newcap: true,
                noempty: true,
                plusplus: true,
                strict: true,
                trailing: true,
                white: true, //harsh but needed. Douglas Crockford style
                reporter:'jslint',
                reporterOutput: 'jshint.xml'
            }
            

        },  


        uglify: {
            options: {
                mangle: true
            },
            main: {
                src: 'build/PhaserMMORPG.concat.js',
                dest: 'build/PhaserMMORPG.min.js'
            }
        },   

        jsdoc : {
            dist : {
                src: ['js/**/*.js', '!js/lib/**/*.js'], 
                options: {
                    destination: 'doc',
                    template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                    configure : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
                }
            }
        }    

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdoc');

    // Tasks.
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);


};