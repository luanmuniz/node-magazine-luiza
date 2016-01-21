'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const magazineLuiza = new MagazineLuizaAPI('0000');
const shippingResult = require('../mock/json/shipping-result.json');

describe('# MAGAZINE LUIZA API - ORDER - CART', function() {
	this.timeout(60000);

	it('Should order has ownProperty calculateShipping()', function() {
		expect(magazineLuiza.order).to.have.a.property('calculateShipping');
	})

	it('Should calculate shipping', function() {
		const options = {
			sessionKey: '0',
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

		return magazineLuiza.order.calculateShipping(options)
			.then(data => {
				expect(data).to.be.deep.equal(shippingResult);
			})
		;
	});
});
