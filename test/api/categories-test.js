'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;
const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID);

describe('# [API] MAGAZINE LUIZA - CATALOG - CATEGORIES', function() {
	this.timeout(5000);

	let result;
	before(function() {
		return magazineLuiza.catalog.getCategories()
			.then(data => {
				result = data;
			})
		;
	});

	it('Should result to be an array', function() {
		expect(result).to.be.an('array');

	});

	it('Should array item has properties category and subcategory ID and description',
	function() {
		expect(result[0]).to.have.all.keys(
			'categoryDescription',
			'categoryId',
			'subcategoryDescription',
			'subcategoryId'
		);
	});
});
