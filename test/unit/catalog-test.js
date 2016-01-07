'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const parser = require('xml2js').parseString;
const MagazineLuizaAPI = require('../../index');
const catalogResult = require('../mock/json/catalog-result.json');

describe('# MAGAZINE LUIZA API - CATALOG', () => {
	var magazineLuiza;
	before(() => {
		magazineLuiza = new MagazineLuizaAPI('0000');
	});

	it('Should MagazineLuizaAPI has ownProperty catalog', () => {
		expect(magazineLuiza).has.ownProperty('catalog');
	});

	it('Should catalog to be an object', () => {
		expect(magazineLuiza.catalog).to.be.an('object');
	});

	it('Should parse XML to JSON', () => {
		return magazineLuiza.catalog.getFullCatalog()
			.then((data) => {
				return expect(data).to.be.deep.equal(catalogResult);
			})
		;
	});
});
