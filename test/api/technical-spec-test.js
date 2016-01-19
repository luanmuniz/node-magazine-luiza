'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;

describe('# [API] MAGAZINE LUIZA - CATALOG - TECHNICAL SPEC', function() {
	this.timeout(90000);
	const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID);

	it('Should return technical spec of the first product', function() {
		const catalog = magazineLuiza.catalog;
		return catalog.getProducts()
			.then(data => catalog.getTechnicalSpec(data[0].id, data[0].model))
			.then(techSpec => expect(techSpec).to.be.an('object'));
		;
	});
});
