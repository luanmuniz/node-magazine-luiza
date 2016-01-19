'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;
const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID);

describe('# [API] MAGAZINE LUIZA - CATALOG - CATEGORIES', function() {
	this.timeout(5000);

	it('Should return all categories', function() {
		return magazineLuiza.catalog.getCategories()
			.then(data => {
				return expect(data).to.be.an('array');
			})
		;
	});
});
