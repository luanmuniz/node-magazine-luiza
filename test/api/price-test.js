'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;
const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID, 'development');

describe('# [API] MAGAZINE LUIZA - CATALOG - PRICE', function() {
	this.timeout(100000);

	it('Should return product prices', function() {
		const catalog = magazineLuiza.catalog;
		return catalog.getProducts()
			.then(data => catalog.getPrice(data[0].id, data[0].model))
			.then(productPrice => {
				expect(productPrice).to.be.an('object');
			})
		;
	});
});
