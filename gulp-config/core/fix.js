'use strict';

let gulp = require('gulp');
let jscs = require('gulp-jscs');
let paths = require('../paths');

gulp.task('fix', () => {
	gulp.src(paths.js, { base: '../../'})
		.pipe(jscs())
		.pipe(jscs.reporter())
		.pipe(jscs({ fix: true }))
		.pipe(gulp.dest('../../'))
});
