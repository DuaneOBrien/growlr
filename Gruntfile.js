/*jslint node:true, es5:true */
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            tests: {
                files: ['*.js', 'tests/specs/*.js'],
                tasks: [ 'jasmine_node']
            }
        },
        jasmine_node: {
            options: {
                forceExit: true,
                match: '.',
                matchall: false,
                extensions: 'js',
                specNameMatcher: 'spec'
            },
            all: ['tests/specs/']
		}
    });

    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('test', [ 'jasmine_node']);
    grunt.registerTask('default', ['test']);
};