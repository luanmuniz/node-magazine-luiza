'use strict';

var coreAPI = require('../core'),
	productsHelper = require('./products-helper'),
	colorsHelper = require('./colors-helper'),
	categoriesHelper = require('./categories-helper'),

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
		return coreAPI.makeRequest('get', 'technicalSpec', id, model);
	},

	getStock() {

	}
};

module.exports = Object.create(CatalogAPI);
