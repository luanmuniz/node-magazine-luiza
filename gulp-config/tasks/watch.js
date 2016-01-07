'use strict';

let gulp = require('gulp');
let paths = require('../paths');

let allFiles = paths.js.concat(paths.testFiles);

gulp.task('watch', [ 'lint' ], () => {
	gulp.watch(allFiles, [ 'lint' ]);
});
