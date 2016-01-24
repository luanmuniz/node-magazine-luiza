'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const magazineLuiza = new MagazineLuizaAPI('0000');
const shippingResult = require('../mock/json/shipping-result.json');
const checkoutResult = require('../mock/json/checkout-result.json');

describe('# MAGAZINE LUIZA API - ORDER - CHECKOUT', function() {
	it('Should order has ownProperty checkout', function() {
		expect(magazineLuiza.order).to.have.a.property('checkout');
	});

	it('Should checkout return an object with order informations', function() {
		const cart = Object.assign({}, shippingResult, {
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

		return magazineLuiza.order.checkout(cart)
			.then(order => {
				expect(order).to.be.deep.equal(checkoutResult);
			});
		;
	});

	it('Should return an error if don\'t pass sessionKey');
	it('Should return an error if don\'t pass CPF or CNPJ');
	it('Should return an error if don\'t pass CEP');
	it('Should return an error if don\'t pass address street');
	it('Should return an error if don\'t pass adress number');
	it('Should return an error if don\'t pass address district');
	it('Should return an error if don\'t pass address city');
	it('Should return an error if don\'t pass address state');
	it('Should return an error if don\'t pass name');
	it('Should return an error if don\'t pass the stateRegistrantion and has a CNPJ');
	it('Should return an error if don\'t pass a partnerOrderNumber');
});
