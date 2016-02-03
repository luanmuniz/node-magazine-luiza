'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;
const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID);

describe('# [API] MAGAZINE LUIZA - CATALOG - COLORS', function() {
	let result;
	before(function() {
		return magazineLuiza.catalog.getColors().then(colors => {
			result = colors;
		});
	});

	it('Should result to be an array of objects', function() {
		expect(result).to.be.an('array')
			.with.deep.property('[0]')
			.that.is.an('object');
	});

	it('Should object result to have properties color and description',
	function() {
		expect(result[0]).to.have.all.keys('color', 'description');
	});
});
