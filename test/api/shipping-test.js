'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;
const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID, 'development');

describe('# [API] MAGAZINE LUIZA - ORDER - CALCULATE SHIPPING', function() {
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
				expect(data).to.be.an('object');
			})
		;
	});
});
