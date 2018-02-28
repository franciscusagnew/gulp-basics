'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps');

// gulp.task("hello", function() {
// 	console.log("Hello, Gulp!");
// });

// Concatenate script files
gulp.task("concatScripts", function() {
	gulp.src([
		'js/jquery.min.js', 
		'js/popper.js',
		'js/bootstrap.min.js',
		'js/ie10-viewport-bug-workaround.js'])
	.pipe(maps.init())
	.pipe(concat('app.js'))
	.pipe(maps.write('./'))
	.pipe(gulp.dest("js"));
});

// Mimify script files
gulp.task('mimifyScripts', function() {
	gulp.src("js/app.js")
	.pipe(uglify())
	.pipe(rename('app.min.js'))
	.pipe(gulp.dest("js"));
});

// Compile sass files
// gulp.task('compileSass', function() {
// 	gulp.src("scss/application.scss")
// 	.pipe(sass())
// 	.pipe(gulp.dest('css'));
// });

gulp.task('build', ['concatScripts', 'mimifyScripts']);

gulp.task("default", ["hello"], function() {
	console.log("This is the default Gulp task!");
});