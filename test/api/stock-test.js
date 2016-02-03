'use strict';

const expect = require('chai').expect;
const getProducts = require('../helpers/get-products');
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;
const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID);

describe('# [API] MAGAZINE LUIZA - CATALOG - STOCK', function() {
	this.timeout(90000);

	let result;
	before(function() {
		const catalog = magazineLuiza.catalog;
		return getProducts()
			.then(data => catalog.getStock(data[0].id, data[0].model))
			.then(stock => {
				result = stock;
			})
		;
	});

	it('Should result to be an object', function() {
		expect(result).to.be.an('object');
	});

	const stockProperties = [
		'productId',
		'productModel',
		'productQuantity',
		'partnerId',
		'available',
		'status',
		'message',
		'needsMount'
	];
	it(`Should result to have properties: ${stockProperties}`, function() {
		expect(result).to.have.all.keys(stockProperties);
	});
});
