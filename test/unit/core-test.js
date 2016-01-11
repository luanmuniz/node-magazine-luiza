'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const core = require('../../lib/core');
const MagazineLuizaAPI = require('../../index');

describe('# MAGAZINE LUIZA API - CORE', function() {
	it('Should core API has a prodUrl property', function() {
		expect(core.prodUrl).to.be.equal('https://corporativo.magazineluiza.com.br');
	});

	it('Should coreAPI has a devUrl property', function() {
		expect(core.devUrl).to.be.equal('http://b2b-xml.sandbox.luizalabs.com');
	});

	it('Should return an error if makeRequest try to get inexistent url',
	function() {
		return core.makeRequest('get', 'wrongPath')
			.catch(err => expect(err).to.be.equal('Request Error'))
		;
	});

	it('Should return error when file type is different from XML',
	function() {
		return core.requestSuccess({})
			.catch(err => expect(err).to.be.an('error'))
		;
	});

	it('Should return an object even new is not used', function() {
		const magazineLuiza = MagazineLuizaAPI('0000');
		expect(magazineLuiza).to.be.instanceof(MagazineLuizaAPI);
	});

	it('Should use development URL when pass dev environment variable',
	function() {
		core.init('0000', 'development');
		expect(core.mainUrl).to.be.equal('http://b2b-xml.sandbox.luizalabs.com');
	});
});
