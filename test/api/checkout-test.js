'use strict';

const expect = require('chai').expect;
const calculateShipping = require('../helpers/calculate-shipping');
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID || '0000';
const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID, 'development');

describe('# [API] MAGAZINE LUIZA - ORDER - CHECKOUT', function() {
	it('Should return a product', function() {
		this.timeout(15000);

		const order = magazineLuiza.order;
		return calculateShipping(magazineLuiza)
			.then(cart => {
				return order.checkout(Object.assign({}, cart, {
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
					partnerOrderNumber: Math.ceil(Math.random() * 9999)
				}))
			})
			.then(response => {
				return expect(response).to.be.an('object');
			})
		;
	});
});
