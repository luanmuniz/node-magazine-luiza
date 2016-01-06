'use strict';

let gulp = require('gulp');
let exec = require('child_process').exec;

gulp.task('update', done => {
	console.log('Updating dotfiles...');
	let commands = [
		'rm -rf ./tmp',
		'mkdir ./tmp',
		'cd ./tmp',
		'git clone git@github.com:ZimpFidelidade/big-bang.git ./',
		'cp .editorconfig .gitignore .jscs.json .jshintrc ../',
		'cd ..',
		'rm -rf ./tmp',
		'gulp lint'
	];
	let options = { shell: '/bin/bash' };
	exec(commands.join(' && '), options, (err, stdout, stderr) => {
		console.log( 'Done!' );
	    if( stdout ) console.log( 'STDOUT:', stdout );
	    if( stderr ) console.log( 'STDERR:', stderr );
	    if( err ) console.log( 'ERROR:', err );
	    process.exit();
		done();
	});
});
