'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const colorsResult = require('../mock/json/colors-result.json');

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
				expect(data).to.be.deep.equal(colorsResult);
			})
		;
	});
});
