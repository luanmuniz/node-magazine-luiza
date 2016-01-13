'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const technicalSpecResult = require('../mock/json/technical-spec-result.json');

describe('# MAGAZINE LUIZA API - CATALOG - TECHNICAL SPEC', function() {
	let magazineLuiza;
	before(function() {
		magazineLuiza = new MagazineLuizaAPI('0000');
	});

	it('Should catalog has a method getTechnicalSpec', function() {
		expect(magazineLuiza.catalog).has.property('getTechnicalSpec');
	});

	it('Should return a Promise error if product code does not to pass',
	function() {
		magazineLuiza.catalog.getTechnicalSpec()
			.catch(err => expect(err).to.be.equal('You must pass SKU'))
		;
	});

	it('Should return technical information passing product ID and model',
	function() {
		const productID = '0842805';
		const productModel = '00';

		return magazineLuiza.catalog.getTechnicalSpec(productID, productModel)
			.then(data => {
				return expect(data).to.be.deep.equal(technicalSpecResult);
			})
		;
	});
});
