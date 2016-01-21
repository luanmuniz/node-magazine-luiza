'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const categoryResult = require('../mock/json/category-result.json');
const magazineLuiza = new MagazineLuizaAPI('0000');

describe('# MAGAZINE LUIZA API - CATALOG - CATEGORIES', function() {
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
