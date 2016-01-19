'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;

describe.skip('# [API] MAGAZINE LUIZA - CATALOG - PRODUCTS', function() {
	const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID);

	it('Should return all products', function() {
		return magazineLuiza.catalog.getProducts()
			.then(data => {
				console.log(data);
			})
			.catch(err => {
				console.log(err);
			})
		;
	});
});
