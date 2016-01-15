'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const stockResult = require('../mock/json/product-in-stock-result.json');

describe('# MAGAZINE LUIZA API - CATALOG - STOCK', function() {
	let magazineLuiza;
	before(function() {
		magazineLuiza = new MagazineLuizaAPI('0000');
	});

	it('Should catalog has a method getStock()', function() {
		expect(magazineLuiza.catalog).has.property('getStock');
	});

	it('Should getStock() return an object with stock information', function() {
		const productID = '1352138';
		const productModel = '00';

		return magazineLuiza.catalog.getStock(productID, productModel)
			.then(stock => {
				console.log(JSON.stringify(stock));
				expect(stock).to.be.deep.equal(stockResult);
			})
		;
	});
});
