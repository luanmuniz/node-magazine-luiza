'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const parser = require('xml2js').parseString;
const MagazineLuizaAPI = require('../../index');
const catalogResult = require('../mock/json/catalog-result.json');

describe('# MAGAZINE LUIZA API - COLORS', function() {
	let magazineLuiza;
	before(function() {
		magazineLuiza = new MagazineLuizaAPI('0000');
	});

	it('Should magazineLuiza has ownProperty colors', function() {
		expect(magazineLuiza).has.ownProperty('colors');
	});
});
