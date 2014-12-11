/* global require */
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	stripDebug = require('gulp-strip-debug'),
	sass = require('gulp-sass'),
	autoprefix = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
	livereload = require('gulp-livereload'),
	stylish = require('jshint-stylish');

// concat and minify the js
gulp.task('js', function () {
	gulp.src([
			'js/plugins.js',
			'js/main.js',
		])
		.pipe(gutil.env.type === 'production' ? stripDebug() : gutil.noop())
		.pipe(uglify())
		.pipe(concat('script.min.js'))
		.pipe(gulp.dest('build/js'));
});

gulp.task('lint', function() {
  gulp.src([
			'js/*.js',
			'!js/angular.js'
		])
		.pipe(jshint('.jshint'))
		.pipe(jshint.reporter(stylish));
});

// sass
gulp.task('sass', function () {
    gulp.src('scss/*.scss')
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'compressed',
			sourceComments: 'map'
			// sourceComments: 'normal'
		}))
        // .pipe(autoprefix('last 5 versions'))
        // .pipe(minifyCSS())
        .pipe(gulp.dest('build/css'));
});

gulp.task('livereload', function () {
	gulp.src([
		'build/**', '*.html'
	])
	.pipe(livereload()
	);
});

// Rerun the task when a file changes
gulp.task('watch', function () {
	gulp.watch('js/*', ['js']);
	gulp.watch('scss/*', ['sass']);

	var server = livereload();
	gulp.watch(['style.css', 'build/**', '*.html']).on('change', function(file) {
		server.changed(file.path);
	});
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['js', 'sass', 'watch', 'livereload']);
gulp.task('production', ['js', 'sass']);
