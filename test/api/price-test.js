'use strict';

const expect = require('chai').expect;
const getProducts = require('../helpers/get-products');
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;
const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID);

describe('# [API] MAGAZINE LUIZA - CATALOG - PRICE', function() {
	this.timeout(90000);

	let result;
	before(function() {
		const catalog = magazineLuiza.catalog;
		return getProducts()
			.then(data => catalog.getPrice(data[0].id, data[0].model))
			.then(productPrice => {
				result = productPrice;
			})
		;
	});

	it('Should result of product prices to be an object', function() {
		expect(result).to.be.an('object');
	});

	const priceProperties = [
		'productId',
		'productModel',
		'valueBrl',
		'valueCurrency',
		'partnerId',
		'status',
		'message'
	];
	it(`Should result to have properties ${priceProperties}`, function() {
		expect(result).to.have.all.keys(priceProperties);
	});
});
