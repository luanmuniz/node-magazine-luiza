'use strict';

let gulp = require('gulp');
let istanbul = require('gulp-istanbul');
let mocha = require('gulp-mocha');
let coverage = require('../coverage');
let paths = require('../paths');

let allFiles = paths.js.concat(paths.testFiles);

gulp.task('pre-test', done => {
	process.env.NODE_ENV = 'test';
	return gulp.src(paths.js)
		.pipe(istanbul())
		.on('error', handleError(done))
		.pipe(istanbul.hookRequire());
});

gulp.task('test', [ 'pre-test' ], done => {
	return gulp.src(allFiles)
		.pipe(mocha())
		.on('error', handleError(done))
		.pipe(istanbul.writeReports())
		.pipe(istanbul.enforceThresholds({
			thresholds: coverage
		}))
		.on('error', () => {
			console.log('MINIMUM COVERAGE:\n', coverage.global);
			console.log('='.repeat(80));
			process.exit();
		})
		.on('end', handleError(done));
});

function handleError(done) {
	return (err) => {
		console.log('ERROR:', err);
		done();
		process.exit();
	};
}

function isDevelopment() {
	return (process.env.NODE_ENV || 'development') === 'development';
}
