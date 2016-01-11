'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const core = require('../../lib/core');

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
});
