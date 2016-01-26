'use strict';

const expect = require('chai').expect;
const calculateShipping = require('../helpers/calculate-shipping');
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;
const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID, 'development');

describe('# [API] MAGAZINE LUIZA - ORDER - CALCULATE SHIPPING', function() {
	 this.timeout(5000);

	it('Should calculate shipping', function() {
		return calculateShipping(magazineLuiza)
			.then(data => expect(data).to.be.an('object'))
		;
	});
});
