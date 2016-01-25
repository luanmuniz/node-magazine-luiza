'use strict';

const core = require('../core'),
	productsHelper = require('./products-helper'),
	colorsHelper = require('./colors-helper'),
	categoriesHelper = require('./categories-helper'),
	technicalSpecHelper = require('./technical-spec-helper'),
	stockHelper = require('./stock-helper'),
	priceHelper = require('./price-helper'),

CatalogAPI = {
	getProducts() {
		return core.makeRequest('get', 'products', { encoding: 'ISO-8859-1' })
			.then(productsHelper.parseObject)
		;
	},

	getColors() {
		return core.makeRequest('get', 'colors')
			.then(colorsHelper.parseObject)
		;
	},

	getCategories() {
		return core.makeRequest('get', 'categories')
			.then(categoriesHelper.parseObject)
		;
	},

	getTechnicalSpec(id, model) {
		if(!id || !model) {
			return core.errorHandler('product', 'MISSING_ID_MODEL');
		}
		return technicalSpecHelper.makeRequest(id, model);
	},

	getStock(id, model, quantity) {
		if(!id || !model) {
			return core.errorHandler('product', 'MISSING_ID_MODEL');
		}
		quantity = quantity || 1;
		return stockHelper.makeRequest(id, model, quantity);
	},

	getPrice(id, model) {
		if(!id || !model) {
			return core.errorHandler('product', 'MISSING_ID_MODEL');
		}
		return priceHelper.makeRequest(id, model);
	}
};

module.exports = Object.create(CatalogAPI);
