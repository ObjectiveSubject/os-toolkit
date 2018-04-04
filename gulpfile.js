var autoprefixer = require('gulp-autoprefixer'),
    // addsrc 		 = require('gulp-add-src'),
	cleancss 	 = require('gulp-clean-css'),
	combineMq	 = require('gulp-combine-mq'),
	// concat 		 = require('gulp-concat-util'),
	gulp 		 = require('gulp'),
	// jshint 		 = require('gulp-jshint'),
	// livereload   = require('gulp-livereload'),
	rename 		 = require('gulp-rename'),
	sass 		 = require('gulp-ruby-sass'),
	sourcemaps 	 = require('gulp-sourcemaps');
    // uglify 		 = require('gulp-uglify');
	
var pkg	   = require('./package.json'),
	banner = '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
			 ' * <%= pkg.homepage %>\n' +
			 ' * Copyright (c) <%= new Date().getFullYear() %>;' +
			 ' * Licensed GPLv2+' +
			 ' */\n\n';


// Styles
gulp.task('styles', function() {
	return sass('src/os-toolkit.scss', { style: 'expanded', sourcemap: true, precision: 5 })
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(combineMq({
			beautify: false
		}))
		.pipe(cleancss())
		.pipe(gulp.dest('dist/css'));
});

// Default task
gulp.task('default', [], function() {
	gulp.start('styles');
});

// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('src/**/*.scss', ['styles']);

});
