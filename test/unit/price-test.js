'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const priceHelper = require('../../lib/catalog/price-helper');
const productPriceResult = require('../mock/json/product-price-result.json');
const magazineLuiza = new MagazineLuizaAPI('0000');

describe('# MAGAZINE LUIZA API - CATALOG - PRICE', function() {
	it('Should catalog has a method getPrice()', function() {
		expect(magazineLuiza.catalog).to.have.a.property('getPrice');
	});

	it('Should return an error if don\'t pass id or model', function() {
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

	it('Should return an error if returned status is different from zero',
	function() {
		const options = {
			idStatus: '1',
			Mensagem: 'Some error message'
		};

		return priceHelper.parseObject(options)
			.catch(err => {
				expect(err.err).to.contains.all.keys('status', 'message');
			})
		;
	});
});
