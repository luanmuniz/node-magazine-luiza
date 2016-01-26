'use strict';

const expect = require('chai').expect;
const checkout = require('../helpers/checkout');
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;
const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID, 'development');

describe('# [API] MAGAZINE LUIZA - ORDER - UPDATE', function() {
	this.timeout(10000);

	it('Should approve an order', function() {
		const order = magazineLuiza.order;
		return checkout(magazineLuiza)
			.then(response => {
				return order.update({
					orderNumber: response.orderNumber,
					cpf: response.cpf,
					approved: true
				});
			})
			.then(response => {
				expect(response).to.be.an('object');
			})
		;
	});
});
