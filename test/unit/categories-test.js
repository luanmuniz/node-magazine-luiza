'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const categoryResult = require('../mock/json/category-result.json');

describe('# MAGAZINE LUIZA API - CATALOG - CATEGORIES', function() {
	let magazineLuiza;
	before(function() {
		magazineLuiza = new MagazineLuizaAPI('0000');
	});

	it('Should catalog has a method getCategories()', function() {
		expect(magazineLuiza.catalog).to.have.a.property('getCategories');
	});

	it('Should getCategories() return an array of objects with categories',
	function() {
		return magazineLuiza.catalog.getCategories()
			.then(data => {
				return expect(data).to.be.deep.equal(categoryResult);
			})
		;
	});
});
