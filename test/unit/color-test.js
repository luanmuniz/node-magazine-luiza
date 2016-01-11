'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const parser = require('xml2js').parseString;
const MagazineLuizaAPI = require('../../index');
const catalogResult = require('../mock/json/catalog-result.json');

describe('# MAGAZINE LUIZA API - CATALOG - COLORS', function() {
	let magazineLuiza;
	before(function() {
		magazineLuiza = new MagazineLuizaAPI('0000');
	});

	it('Should catalog has a method getColors()', function() {
		expect(magazineLuiza.catalog).has.property('getColors');
	});

	it('Should getColors() return an array of objects with colors', function() {
		return magazineLuiza.catalog.getColors()
			.then(data => {
				console.log(data);
			})
		;
	});
});
