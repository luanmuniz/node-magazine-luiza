'use strict';

const expect = require('chai').expect;
const getProducts = require('../helpers/get-products');
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;
const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID);

describe('# [API] MAGAZINE LUIZA - CATALOG - TECHNICAL SPEC', function() {
	this.timeout(90000);

	let result;
	before(function() {
		const catalog = magazineLuiza.catalog;
		return getProducts()
			.then(data => catalog.getTechnicalSpec(data[0].id, data[0].model))
			.then(techSpec => {
				result = techSpec;
			})
		;
	});

	it('Should technical spec of the first product to be an object',
	function() {
		expect(result).to.be.an('object');
	});

	it('Should result to have properties product and specs', function() {
		expect(result).to.have.all.keys('product', 'specs');
	});

	it('Should product object has properties id and model (SKU):', function() {
		expect(result.product).to.have.all.keys('id', 'model');
	});

	it('Should specs to be an array of objects', function() {
		expect(result.specs).to.be.an('array')
			.with.deep.property('[0]')
			.that.is.an('object');
	});

	it('Should object in specs has properties title and description',
	function() {
		expect(result.specs[0]).to.have.all.keys('title', 'description');
	});
});
