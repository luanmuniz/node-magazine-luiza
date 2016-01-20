'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;

describe('# [API] MAGAZINE LUIZA - CATALOG - PRICE', function() {
	this.timeout(90000);
	const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID);

	it('Should return true if there is a product in stock', function() {
		const catalog = magazineLuiza.catalog;
		return catalog.getProducts()
			.then(data => catalog.getPrice(data[0].id, data[0].model))
			.then(productPrice => {
				console.log(productPrice);
				expect(productPrice).to.be.an('object');
			})
		;
	});
});
