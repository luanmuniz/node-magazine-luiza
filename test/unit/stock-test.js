'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const stockResult = require('../mock/json/product-in-stock-result.json');
const magazineLuiza = new MagazineLuizaAPI('0000');

describe('# MAGAZINE LUIZA API - CATALOG - STOCK', function() {
	it('Should catalog has a method getStock()', function() {
		expect(magazineLuiza.catalog).to.have.a.property('getStock');
	});

	it('Should return an error if don\'t pass product id or model', function(){
		return magazineLuiza.catalog.getStock()
			.catch(err => {
				return expect(err.message).to.be.equal(
					'You must pass product ID and Model'
				);
			})
		;
	});

	it('Should getStock() return an object with stock information', function() {
		const productID = '0000000';
		const productModel = '00';

		return magazineLuiza.catalog.getStock(productID, productModel)
			.then(stock => {
				expect(stock).to.be.deep.equal(stockResult);
			})
		;
	});
});
