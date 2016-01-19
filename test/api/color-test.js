'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;

describe('# [API] MAGAZINE LUIZA - COLORS', function() {
	let magazineLuiza = new MagazineLuizaAPI(PARTNER_ID, 'production');

	it('Should return all products', function() {
		return magazineLuiza.catalog.getColors()
			.then(colors => expect(colors).to.be.an('array'))
		;
	});
});
