'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const shippingResult = require('../mock/json/shipping-result.json');

describe('# MAGAZINE LUIZA API - ORDER - CALCULATE SHIPPING', function() {
	let cart,
		magazineLuiza;

	beforeEach(function() {
		magazineLuiza = new MagazineLuizaAPI('0000');
		cart = {
			sessionKey: 0,
			cpf: '911.850.433-73',
			cep: '17120-000',
			products: [{
				id: '2083101',
				model: '00',
				quantity: 1
			},{
				id: '0235175',
				model: '00',
				quantity: 1
			}]
		};
	});

	const requestError = (cart, message)  => {
		return magazineLuiza.order.calculateShipping(cart)
			.catch(err => expect(err.message).to.be.equal(message));
	};

	it('Should order has ownProperty calculateShipping()', function() {
		expect(magazineLuiza.order).to.have.a.property('calculateShipping');
	})

	it('Should calculate shipping', function() {
		return magazineLuiza.order.calculateShipping(cart)
			.then(data => {
				expect(data).to.be.deep.equal(shippingResult);
			})
		;
	});

	it('Should return an error if don\'t pass sessionKey', function() {
		delete cart.sessionKey;
		return requestError(cart, 'You must pass a sessionKey');
	});

	it('Should return an error if don\'t pass CPF', function() {
		delete cart.cpf;
		return requestError(cart, 'You must pass the CPF or CNPJ');
	});

	it('Should return an error if don\'t pass CEP', function() {
		delete cart.cep;
		return requestError(cart, 'You must pass a valid CEP');
	});

	it('Should return an error if don\'t pass products', function() {
		delete cart.products;
		return requestError(cart, 'You must pass the products');
	});

	it('Should return an error if products don\'t be an array', function() {
		cart.products = {};
		return requestError(cart, 'Products must be an array of items');
	});

	it('Should return an error if products don\'t have an id', function() {
		delete cart.products[0].id;
		return requestError( cart, 'Every product must have an ID');
	});

	it('Should return an error if products don\'t have a model', function() {
		delete cart.products[0].model;
		return requestError(cart, 'Every product must have a model');
	});

	it('Should return an error if products don\'t have a quantity', function() {
		delete cart.products[0].quantity;
		return requestError(cart, 'Every product must have quantity');
	});
});
