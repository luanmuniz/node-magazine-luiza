'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const catalogResult = require('../mock/json/catalog-result.json');
const magazineLuiza = new MagazineLuizaAPI('0000');

describe('# MAGAZINE LUIZA API - CATALOG - PRODUCTS', function() {
	it('Should catalog has ownProperty getProducts()', function() {
		expect(magazineLuiza.catalog).to.have.a.property('getProducts');
	});

	it('Should getProduct() return an array of products', function() {
		return magazineLuiza.catalog.getProducts()
			.then(data => {
				return expect(data).to.be.deep.equal(catalogResult);
			})
		;
	});
});
