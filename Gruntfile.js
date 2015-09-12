module.exports = function(grunt) {

	'use strict';

	var config = {
		app: './',
		dist: './'
	};

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: config,
		less: {
			compile: {
				options: {
					//style: 'compressed',
					// style: 'nested',
					sourceMap: true
				},
				files: [{
					expand: true,
					cwd: '<%= config.app %>/less/',
					src: ['**/*.less'],
					dest: '<%= config.dist %>/css/',
					ext: '.css'
				}]
			}
		},
		watch: {
			less: {
				files: ['<%= config.app %>less/**/*.less'],
				tasks: ['less']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['less', 'watch']);

};
