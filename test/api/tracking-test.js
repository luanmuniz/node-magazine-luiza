'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const trackingResult = require('../mock/json/tracking-result.json');
const PARTNER_ID = process.env.PARTNER_ID;
const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID, 'development');

describe('# [API] MAGAZINE LUIZA - POST SALE - TRACKING', function() {
	it('Should return informations about tracking', function() {
		const options = {
			cpf: '11111111111',
			orderNumber: '123'
		};

		return magazineLuiza.postSale.tracking(options)
			.then(track => {
				expect(track).to.have.all.keys(Object.keys(trakingResult));
			})
			.catch(err => {
				console.log(err);
				expect(err).to.have.deep.property('err.status');
				expect(err).to.have.deep.property('err.message');
			})
		;
	});
});
