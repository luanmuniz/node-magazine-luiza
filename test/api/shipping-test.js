'use strict';

const expect = require('chai').expect;
const getProducts = require('../helpers/get-products');
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;
const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID, 'development');

describe('# [API] MAGAZINE LUIZA - ORDER - CALCULATE SHIPPING', function() {
	 this.timeout(5000);

	it('Should calculate shipping', function() {
		return getProducts(magazineLuiza)
			.then(products => {
				const cart = {
					sessionKey: 0,
					cpf: '911.850.433.73',
					cep: '17120-000',
					products: [{
						id: products[0].id,
						model: products[0].model,
						quantity: 2
					},{
						id: products[1].id,
						model: products[1].model,
						quantity: 3
					}]
				};

				return magazineLuiza.order.calculateShipping(cart);
			})
			.then(data => expect(data).to.be.an('object'))
		;
	});
});
