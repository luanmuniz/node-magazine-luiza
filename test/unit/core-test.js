'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const core = require('../../lib/core');
const MagazineLuizaAPI = require('../../index');

describe('# MAGAZINE LUIZA API - CORE', function() {
	it('Should core API has a prodUrl property', function() {
		expect(core.prodUrl).to.be.equal(
			'https://corporativo.magazineluiza.com.br'
		);
	});

	it('Should coreAPI has a devUrl property', function() {
		expect(core.devUrl).to.be.equal('http://b2b-xml.sandbox.luizalabs.com');
	});

	it('Should return an error if makeRequest try to get inexistent url',
	function() {
		return core.makeRequest('get', 'wrongPath')
			.catch(err => expect(err.message).to.be.equal('Wrong URL'))
		;
	});

	it('Should return an error if don\'t pass the ID', function() {
		expect(MagazineLuizaAPI).to.throw(
			Error,
			/You need to pass your credentials to initialize the module/
		);
	});

	it('Should return Unknown Error if don\'t pass arguments to error helper',
	function() {
		return core.errorHandler('core', 'UNKNOWN_ERROR').catch(err => {
			return expect(err.message).to.be.equal('Unknown Error');
		});
	});

	it('Should return an error', function() {
		return core.errorHandler('core', 'UNKNOWN_ERROR', new Error('Error'))
			.catch(err => expect(err).to.be.an.Error)
		;
	});

	it('Should return error when file type is different from XML',
	function() {
		return core.requestSuccess({})
			.catch(err => expect(err).to.be.an('error'))
		;
	});

	it('Should return the MagazineLuizaAPI object even new is not used',
	function() {
		const magazineLuiza = MagazineLuizaAPI('0000');
		expect(magazineLuiza).to.be.instanceof(MagazineLuizaAPI);
	});

	it('Should use development URL when pass dev environment variable',
	function() {
		core.init('0000', 'development');
		expect(core.mainUrl).to.be.equal(
			'http://b2b-xml.sandbox.luizalabs.com'
		);
	});

	it('Should return same character when can\'t decode this one', function() {
		expect(core.toUtf8('a%AFc')).to.be.equal('a%AFc');
	});
});
