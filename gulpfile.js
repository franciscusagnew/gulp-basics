'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	del = require('del'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	util = require('gulp-util'),
	wrench = require('wrench'),
	maps = require('gulp-sourcemaps');

var options = {
	src: 'src',
	dist: 'dist',
	tmp: '.tmp',
	e2e: 'e2e',
	errorHandler: function(title) {
		return function(err) {
			util.log(util.colors.red('[' + title + ']'), err.toString());
			this.emit('end');
		};
	},
	wiredep: {
		directory: 'bower_components',
		exclude: [/bootstrap-sass-official\/.*\.js/, /bootstrap\.css/]
	}
};

// wrench.readdirSyncRecursive('./gulp').filter(function(file) {
// 	return (/\.(js|coffee)$/i).test(file);
// }).map(function(file) {
// 	require('./gulp/' + file)(options);
// });

// Concatenate script files
gulp.task("concatScripts", function() {
	return gulp.src([
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
gulp.task('mimifyScripts', ['concatScripts'], function() {
	return gulp.src("js/app.js")
	.pipe(uglify())
	.pipe(rename('app.min.js'))
	.pipe(gulp.dest("js"));
});

gulp.task('mimifyCss', function() {
	return gulp.src("css/*.css")
	.pipe(watch('css/*.css'))
	.pipe(rename('style.min.css'))
	.pipe(gulp.dest("css"));
});

// Compile Sass files
// gulp.task('compileSass', function() {
// 	return gulp.src("scss/application.scss")
// 	.pipe(maps.init())
// 	.pipe(sass())
// 	.pipe(maps.write('./'))
// 	.pipe(gulp.dest('css'));
// });

// gulp.task("watchSass", function() {
// 	gulp.watch('scss/**/*.scss', ['compileSass']);
// });

gulp.task('watchFiles', function() {
	gulp.watch('js/app.js', ['concatScripts']);
});

gulp.task('clean', function() {
	del(['dist', 'css/application.css*', 'js/app*.js*']);
});

gulp.task('build', ['mimifyScripts'], function() {
	return gulp.src(["css/style.css", "js/app.min.js", "index.html", "img/**", "fonts/**"], { base: './'})
	.pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles'], function() {
	browserSync({
		server: {
			baseDir: './'
		}
	});

	gulp.watch(['css/**/*.css'], {cwd: 'g./'}, reload);
});

gulp.task("default", ["clean"], function() {
	gulp.start('build');
});