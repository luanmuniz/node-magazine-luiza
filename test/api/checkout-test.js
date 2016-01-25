'use strict';

const expect = require('chai').expect;
const getProducts = require('../helpers/get-products');
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID || '0000';
const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID);

describe.skip('# [API] MAGAZINE LUIZA - ORDER - CHECKOUT', function() {
	it('Should return a product', function() {
		let sessionKey = '0';

		return getProducts(magazineLuiza)
			.then(products => {
				return magazineLuiza.order.calculateShipping({
					sessionKey: sessionKey,
					cpf: '04026452000',
					cep: '12312123',
					products: [
						Object.assign({}, products[9], { quantity: 1 }),
						Object.assign({}, products[8], { quantity: 1 })
					]
				});
			})
			.then(cart => {
				expect(cart).to.be.an('object');
			})
			.catch(err => console.log(err))
		;
	});
});
