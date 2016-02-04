'use strict';

const expect = require('chai').expect;
const calculateShipping = require('../helpers/calculate-shipping');
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;
const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID, 'development');

describe('# [API] MAGAZINE LUIZA - ORDER - CALCULATE SHIPPING', function() {
	 this.timeout(90000);

	 let result;
	 before(function() {
		return calculateShipping(magazineLuiza).then(data => {
			result = data;
		});
	 });

	it('Should return of calculate shipping to be an object', function() {
		expect(result).to.be.an('object');
	});

	const shippingProperties = [
		'sessionKey',
		'cpf',
		'partnerId',
		'cep',
		'shippingValueBrl',
		'shippingValueCurrency',
		'deliveryTime',
		'deliveryDate',
		'status',
		'message',
		'products'
	];
	it(`Should result to have properties: ${shippingProperties}`, function() {
		expect(result).to.have.all.keys(shippingProperties);
	});

	const productsProperties = [
		'id',
		'model',
		'quantity',
		'available',
		'stock'
	];
	it(`Should products to have properties: ${productsProperties}`, function() {
		expect(result.products[0]).to.have.all.keys(productsProperties);
	});
});
