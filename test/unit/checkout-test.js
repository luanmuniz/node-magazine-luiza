'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const shippingResult = require('../mock/json/shipping-result.json');
const checkoutResult = require('../mock/json/checkout-result.json');
const checkoutHelper = require('../../lib/order/checkout-helper');

describe('# MAGAZINE LUIZA API - ORDER - CHECKOUT', function() {
	let cart,
		magazineLuiza;

	beforeEach(function() {
		magazineLuiza = new MagazineLuizaAPI('0000');
		cart = Object.assign({}, shippingResult, {
			address: {
				street: 'Rua Miguel Mentem',
				number: '100',
				complement: 'Sala 2',
				district: 'Vila Guilherme',
				city: 'São Paulo',
				state: 'SP',
				referency: 'Próximo à algum lugar',
			},
			phone: {
				ddd: '11',
				number: '999991234'
			},
			name: 'Maria Antonieta Silva',
			email: 'email@premiado.com',
			stateRegistration: 'ISENTO',
			partnerOrderNumber: '1188856'
		});
	});

	const requestError = (cart, message) => {
		return magazineLuiza.order.checkout(cart)
			.catch(err => expect(err.message).to.be.equal(message))
		;
	};

	it('Should order has ownProperty checkout', function() {
		expect(magazineLuiza.order).to.have.a.property('checkout');
	});

	it('Should checkout return an object with order informations', function() {
		return magazineLuiza.order.checkout(cart)
			.then(order => {
				expect(order).to.be.deep.equal(checkoutResult);
			});
		;
	});

	it('Should return an error if returned status is different from zero',
	function() {
		const options = {
			idStatus: '1',
			Mensagem: 'Some error message'
		};

		return checkoutHelper.parseObject(options)
			.catch(err => {
				expect(err.err).to.contains.all.keys('status', 'message');
			})
		;
	});

	it('Should return an error if don\'t pass sessionKey', function() {
		delete cart.sessionKey;
		return requestError(cart, 'You must pass a sessionKey');
	});

	it('Should return an error if don\'t pass CPF or CNPJ', function() {
		delete cart.cpf;
		return requestError(cart, 'You must pass the CPF or CNPJ');
	});

	it('Should return an error if don\'t pass CEP', function() {
		delete cart.cep;
		return requestError(cart, 'You must pass a valid CEP');
	});

	it('Should return an error if don\'t pass address', function() {
		delete cart.address;
		return requestError(cart, 'You must pass the address as an object');
	});

	it('Should return an error if address don\'t be an object', function() {
		cart.address = [];
		return requestError(cart, 'Address must be an object');
	});

	it('Should return an error if don\'t pass address street', function() {
		delete cart.address.street;
		return requestError(cart, 'You must pass the address street');
	});

	it('Should return an error if don\'t pass adress number', function() {
		delete cart.address.number;
		return requestError(cart, 'You must pass the address number');
	});

	it('Should return an error if don\'t pass address district', function() {
		delete cart.address.district;
		return requestError(cart, 'You must pass the address district');
	});

	it('Should return an error if don\'t pass address city', function() {
		delete cart.address.city;
		return requestError(cart, 'You must pass the address city');
	});

	it('Should return an error if don\'t pass address state', function() {
		delete cart.address.state;
		return requestError(cart, 'You must pass the address state');
	});

	it('Should return an error if don\'t pass name', function() {
		delete cart.name;
		return requestError(cart, 'You must pass the buyer\'s name');
	});

	it('Should return an error if don\'t pass the stateRegistrantion and has a CNPJ',
	function() {
		cart.cpf = '12345678901234';
		delete cart.stateRegistrantion;
		return requestError(cart, 'You must pass a State Registration');
	});

	it('Should return an error if pass a CPF and State Registration is different from ISENTO',
	function() {
		delete cart.stateRegistration;
		return requestError(cart, 'You must pass State Registration as ISENTO');
	})

	it('Should return an error if don\'t pass a partnerOrderNumber', function() {
		delete cart.partnerOrderNumber;
		return requestError(cart, 'You must pass Partner Order Number');
	});
});
