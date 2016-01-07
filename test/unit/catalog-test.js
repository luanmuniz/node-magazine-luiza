'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const parser = require('xml2js').parseString;
const config = require('../../app').config;
const MagazineLuizaAPI = require('../../index');
const catalogResult = require('../mock/json/catalog-result.json');

describe('# MAGAZINE LUIZA API - CATALOG', () => {
	var magazineLuiza;
	beforeEach(() => {
		magazineLuiza = new MagazineLuizaAPI({
			mainUrl: config.mainUrl,
			id: config.id
		});
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
