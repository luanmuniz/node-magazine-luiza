'use strict';

var coreAPI = require('../core'),
	productsHelper = require('./products-helper'),
	colorsHelper = require('./colors-helper'),
	categoriesHelper = require('./categories-helper'),
	technicalSpecHelper = require('./technical-spec-helper'),
	stockHelper = require('./stock-helper'),

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

	getTechnicalSpec(id, model) {
		if(!id || !model) {
			return coreAPI.errorHandler('product', 'MISSING_ID_MODEL');
		}
		return technicalSpecHelper.makeRequest(id, model);
	},

	getStock(id, model, quantity) {
		quantity = quantity || 1;
		return stockHelper.makeRequest(id, model, quantity);
	}
};

module.exports = Object.create(CatalogAPI);
