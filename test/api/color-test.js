'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;

describe('# [API] MAGAZINE LUIZA - CATALOG - COLORS', function() {
	const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID);

	it('Should return all product colors', function() {
		return magazineLuiza.catalog.getColors()
			.then(colors => expect(colors).to.be.an('array'))
		;
	});
});
