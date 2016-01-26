'use strict';

const expect = require('chai').expect;
const getProducts = require('../helpers/get-products');
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;
const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID);

describe('# [API] MAGAZINE LUIZA - CATALOG - PRODUCTS', function() {
	this.timeout(90000);

	it('Should return all products', function() {
		return getProducts(magazineLuiza)
			.then(data => expect(data).to.be.an('array'))
		;
	});
});
