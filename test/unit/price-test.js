'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');

describe('# MAGAZINE LUIZA API - CATALOG - PRICE', function() {
	let magazineLuiza;
	before(function() {
		magazineLuiza = new MagazineLuizaAPI('0000');
	});

	it('Should catalog has a method getPrice()', function() {
		expect(magazineLuiza.catalog).to.have.a.property('getPrice');
	});
});
