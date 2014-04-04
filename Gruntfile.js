module.exports = function(grunt) {
	var CSSBuilder	= 'less', //less, sass
		pathJade = "app/jade/array/list.json",
		pkg			= grunt.file.readJSON('package.json');

	grunt.initConfig({
		loc : {
			build				: 'build',
			root				: 'app',
			markup				: '<%= loc.root %>/markup',
			jade				: '<%= loc.root %>/jade',
			css					: '<%= loc.root %>/css',
			less				: '<%= loc.css %>/less',
			sass				: '<%= loc.css %>/sass',
			images				: '<%= loc.root %>/images',

			cssMinName			: 'all.min.css',
			cssMapName			: '<%= loc.cssMinName %>.map',
			cssMapUrl			: '../css/<%= loc.cssMapName %>',
			cssMapPath			: '<%= loc.css %>/<%= loc.cssMapName %>',
			cssMin				: '<%= loc.css %>/<%= loc.cssMinName %>',
			
			lessMain			: '<%= loc.less %>/all.less',
			sassMain			: '<%= loc.sass %>/all.scss',
			
			imagesMin			: '<%= loc.build %>/images'
		},
		less : {
			dist : {
				files : {
					'<%= loc.cssMin %>' : '<%= loc.lessMain %>'
				}
			},
			options : {
				sourceMap			: true,
				compress			: true,
				sourceMapFilename	: '<%= loc.cssMapPath %>',
				sourceMapBasepath	: '<%= loc.less %>',
				sourceMapURL		: '<%= loc.cssMapUrl %>'
			}
		},
		sass : {
			dist : {
				files : {
					'<%= loc.cssMin %>' : '<%= loc.sassMain %>'
				}
			},
			options : {
				sourcemap	: '<%= loc.cssMapPath %>', //require sass ver 3.3.0, gem install sass --pre
				style		: 'compressed'
			}
		},
		imagemin : {
			dynamic : {
				options : {
					ptimizationLevel	: 7,
					cache				: false
				},
				files: [{
					expand	: true,						// Enable dynamic expansion
					cwd		: '<%= loc.images %>',		// Src matches are relative to this path
					src		: ['**/*.{png,jpg,gif}'],	// Actual patterns to match
					dest	: '<%= loc.imagesMin %>'	// Destination path prefix
				}]
			}
		},
		jade : {
			compile: {
				options:{
					pretty: true,
					client: false,
					data: grunt.file.readJSON(pathJade)
				},
				files: [ {
				  src: "**/*.jade",
				  dest: "<%= loc.markup %>",
				  cwd: "<%= loc.jade %>/temp",
				  expand: true,
				  ext: ".html"
				} ]
			}
		},
		clean : {
			clear : {
				src : [
					'<%= loc.cssMin %>',
					'<%= loc.cssMapPath %>',
					'<%= loc.build %>',
					'node_modules',
					'build',
					'npm-debug.log'
				]
			}
		},
		watch : {
			jade: {
				files: [
							'<%= loc.jade %>/temp/**/*.jade'
						],
				tasks: ['newer:jade'],
				options: {
					spawn: false,
					livereload: true,
				},
			},
			jade_all: {
				files: [
							'<%= loc.jade %>/**/*.jade',
							'!<%= loc.jade %>/temp**/*.jade'
						],
				tasks: ['jade'],
				options: {
					spawn: false,
					livereload: true,
				},
			},
			scripts : {
				files : [
							'Gruntfile.js',
							'<%= loc.jade %>/**/*.json',
							'<%= loc.css %>/**/*.less',
							'<%= loc.sass %>/**/*.scss',
							//Ignore files
							'!<%= loc.cssMin %>',
							'!<%= loc.cssMapPath %>'
						],
				tasks	: [CSSBuilder],
				options	: {
					livereload : {
						port : 35729
					}
				}
			}
		},
		connect : {
			server : {
				options: {
					port		: 8080,
					livereload	: true,
					base		: '<%= loc.root %>'
				}
			}
		},
		copy : {
			main : {
				files : [
					{
						expand	: true,
						flatten	: true,
						src		: ['<%= loc.cssMin %>', '<%= loc.cssMapPath %>'],
						dest	: '<%= loc.build %>'
					}
				]
			}
		},
		sprite:{
			all: {
				src: '<%= loc.images %>/for_sprite/*',
				engine: 'pngsmith',
				cssTemplate: '<%= loc.css %>/sprites/'+CSSBuilder+'.template.mustache',
				destImg: '<%= loc.images %>/sprites/spritesheet.png',
				destCSS: '<%= loc.css %>/'+CSSBuilder+'/modules/sprites.'+CSSBuilder,
				cssFormat: CSSBuilder
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');		//clean other files
	grunt.loadNpmTasks('grunt-contrib-less');		//convert less files to css
	grunt.loadNpmTasks('grunt-contrib-sass');		//convert sass files to css
	grunt.loadNpmTasks('grunt-contrib-watch');		//watching file change
	grunt.loadNpmTasks('grunt-contrib-connect');	//local server run
	grunt.loadNpmTasks('grunt-contrib-copy');		//copy files
	grunt.loadNpmTasks('grunt-contrib-imagemin');	//min images
	grunt.loadNpmTasks('grunt-contrib-jade');		//convert jade templates to html
	grunt.loadNpmTasks('grunt-spritesmith');		//make sprites
	grunt.loadNpmTasks('grunt-newer');				// watch saved file

	grunt.registerTask('default', ['connect', CSSBuilder, 'watch']);
	grunt.registerTask('run', [CSSBuilder, 'jade']);
	grunt.registerTask('build', [CSSBuilder, 'jade', 'copy', 'imagemin']);

	grunt.registerTask('clear', ['clean:clear']);
};