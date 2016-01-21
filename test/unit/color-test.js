'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const colorsResult = require('../mock/json/colors-result.json');
const magazineLuiza = new MagazineLuizaAPI('0000');

describe('# MAGAZINE LUIZA API - CATALOG - COLORS', function() {
	it('Should catalog has a method getColors()', function() {
		expect(magazineLuiza.catalog).to.have.a.property('getColors');
	});

	it('Should getColors() return an array of objects with colors', function() {
		return magazineLuiza.catalog.getColors()
			.then(data => {
				return expect(data).to.be.deep.equal(colorsResult);
			})
		;
	});
});
