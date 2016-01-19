'use strict';

let gulp = require('gulp');
let istanbul = require('gulp-istanbul');
let mocha = require('gulp-mocha');
let coverage = require('../coverage');
let paths = require('../paths');

let allFilesAndTestsUnit = paths.js.concat(paths.testFiles.unit);
let allFilesAndTestsAPI = paths.js.concat(paths.testFiles.api);

gulp.task('pre-test', ['lint'], done => {
	process.env.NODE_ENV = 'test';
	return gulp.src(paths.js)
		.pipe(istanbul())
		.on('error', handleError(done))
		.pipe(istanbul.hookRequire());
});

gulp.task('test:unit', [ 'pre-test' ], done => {
	return test(allFilesAndTestsUnit, coverage.unit, done);
});

gulp.task('test:api', [ 'pre-test' ], done => {
	return test(allFilesAndTestsAPI, coverage.api, done);
});

function test(files, coverage, done) {
	return gulp.src(files)
		.pipe(mocha())
		.on('error', handleError(done))
		.pipe(istanbul.writeReports())
		.pipe(istanbul.enforceThresholds({
			thresholds: coverage
		}))
		.on('error', () => {
			console.log('MINIMUM COVERAGE:\n', coverage.global);
			console.log('='.repeat(80));
			process.exit(1);
		})
		.on('end', handleError(done));

}

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
