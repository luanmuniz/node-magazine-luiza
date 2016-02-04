'use strict';

const expect = require('chai').expect;
const checkout = require('../helpers/checkout');
const checkoutResult = require('../mock/json/checkout-result.json');
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;
const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID, 'development');

describe.skip('# [API] MAGAZINE LUIZA - ORDER - CHECKOUT', function() {
	this.timeout(90000);

	let result, err;
	before(function() {
		return checkout(magazineLuiza).then(response => {
			console.log('RESULT');
			result = response;
		})
		.catch(e => {
			console.log('ERR', e);
			err = e;
		});
	});

	it('Should result to be an object', function() {
		expect(result).to.be.an('object');
	});

	it('Should return a product', function() {
		expect(result).to.have.all.keys(Object.keys(checkoutResult));
	});
});
