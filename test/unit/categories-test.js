'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');

describe('# MAGAZINE LUIZA API - CATALOG - CATEGORIES', function() {
	let magazineLuiza;
	before(function() {
		magazineLuiza = new MagazineLuizaAPI('0000');
	});

	it('Should catalog has a method getCategories()', function() {
		expect(magazineLuiza.catalog).has.property('getCategories');
	});
});
