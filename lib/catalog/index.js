'use strict';

var coreAPI = require('../core'),
	productsHelper = require('./products-helper'),
	colorsHelper = require('./colors-helper'),
	categoriesHelper = require('./categories-helper'),
	technicalSpecHelper = require('./technical-spec-helper'),

CatalogAPI = {
	getProducts() {
		return coreAPI.makeRequest('get', 'products')
			.then(productsHelper.parseObject)
		;
	},

	getColors() {
		return coreAPI.makeRequest('get', 'colors')
			.then(colorsHelper.parseObject)
		;
	},

	getCategories() {
		return coreAPI.makeRequest('get', 'categories')
			.then(categoriesHelper.parseObject)
		;
	},

	getTechnicalSpec(sku) {
		if(!sku) {
			return coreAPI.errorHandler('product', 'MISSING_SKU');
		}
		return coreAPI.makeRequest('get', 'technicalSpec', sku)
			.then(technicalSpecHelper.parseObject)
		;
	}
};

module.exports = Object.create(CatalogAPI);
