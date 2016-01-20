'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const productPriceResult = require('../mock/json/product-price-result.json');

describe('# MAGAZINE LUIZA API - CATALOG - PRICE', function() {
	let magazineLuiza;
	before(function() {
		magazineLuiza = new MagazineLuizaAPI('0000');
	});

	it('Should catalog has a method getPrice()', function() {
		expect(magazineLuiza.catalog).to.have.a.property('getPrice');
	});

	it('Should return an error if dont pass id or model', function() {
		return magazineLuiza.catalog.getPrice()
			.catch(err => {
				return expect(err.message).to.be.equal(
					'You must pass product ID and Model'
				)
			})
		;
	});

	it('Should getPrice() return an object with price of product', function() {
		const productId = '0000000';
		const productModel = '00';

		return magazineLuiza.catalog.getPrice(productId, productModel)
			.then(productPrice => {
				expect(productPrice).to.be.deep.equal(productPriceResult);
			})
		;
	});
});
