'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const parser = require('xml2js').parseString;
const MagazineLuizaAPI = require('../../index');
const catalogResult = require('../mock/json/catalog-result.json');

describe('# MAGAZINE LUIZA API - CATALOG', function() {
	let magazineLuiza;
	before(function() {
		magazineLuiza = new MagazineLuizaAPI('0000');
	});

	it('Should MagazineLuizaAPI has ownProperty catalog', function() {
		expect(magazineLuiza).has.ownProperty('catalog');
	});

	it('Should catalog to be an object', function() {
		expect(magazineLuiza.catalog).to.be.an('object');
	});

	it('Should parse XML to JSON', function() {
		return magazineLuiza.catalog.getProducts()
			.then((data) => {
				return expect(data).to.be.deep.equal(catalogResult);
			})
		;
	});
});
