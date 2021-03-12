// Created by stefan on 30-01-2020
// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano'),
	lineec = require('gulp-line-ending-corrector'),
	imagemin = require('gulp-imagemin'),
	changed = require('gulp-changed'),
	livereload = require('gulp-livereload'),
	prettyError = require('gulp-prettyerror');
	rename = require("gulp-rename");

// Source files paths
const files = {
	scssPath: './src/sass/**/*.scss',
	jsPath: './src/js/**/*.js',
	imgPath: './src/images/**/*.*'
};

// Dist paths
const distPath = {
	cssDist: './dist/css',
	jsDist: './dist/js',
	imgDist: './dist/images'
};

// Sass task: compiles the style.scss file into dist/css/style.css and dist/css/style.min.css
function scssTask() {
	return src(files.scssPath)
		.pipe(prettyError())
		.pipe(sourcemaps.init()) // initialize sourcemaps first
		.pipe(sass()) // compile SCSS to CSS
		.pipe(sourcemaps.write()) // write sourcemaps file in dist/css directory
		.pipe(dest(distPath.cssDist)) // css no prefix or minify
		.pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
		.pipe(rename("styles.min.css"))
		.pipe(sourcemaps.write('.')) // write sourcemaps file in dist/css directory
		.pipe(lineec()) // line ending corrector
		.pipe(
			dest(distPath.cssDist) // put final CSS in dist/css folder
		)
		.pipe(livereload());
}

// JS Task
function jsTask() {
	return src(files.jsPath)
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(lineec()) // line ending corrector
		.pipe(dest(distPath.jsDist));
}

// Images minify task
function imgTask() {
	return src(files.imgPath)
		.pipe(changed(distPath.imgDist))
		.pipe(
			imagemin([
				imagemin.gifsicle({ interlaced: true }),
				imagemin.mozjpeg({ quality: 75, progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({
					plugins: [ { removeViewBox: true }, { cleanupIDs: false } ]
				})
			])
		)
		.pipe(dest(distPath.imgDist));
}

// Watch task
function watchTask() {
	livereload.listen();
	watch([ files.scssPath, files.jsPath, files.imgPath ], parallel(scssTask, jsTask, imgTask));
}

// Default task
exports.default = series(parallel(scssTask, jsTask, imgTask), watchTask);
