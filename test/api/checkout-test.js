'use strict';

const expect = require('chai').expect;
const checkout = require('../helpers/checkout');
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;
const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID, 'development');

describe('# [API] MAGAZINE LUIZA - ORDER - CHECKOUT', function() {
	it('Should return a product', function() {
		this.timeout(15000);

		return checkout(magazineLuiza)
			.then(response => {
				return expect(response).to.be.an('object');
			})
		;
	});
});
