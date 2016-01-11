'use strict';

var coreAPI = require('../core'),
	catalogHelper = require('./helper'),
	colorsHelper = require('./colors-helper'),

CatalogAPI = {
	getProducts() {
		return coreAPI.makeRequest('get', 'products')
			.then(json  => catalogHelper.parseObject(json))
		;
	},

	getColors() {
		return coreAPI.makeRequest('get', 'colors')
			.then(json => colorsHelper.parseObject(json))
		;
	},

	getCategories() {

	}
};

module.exports = Object.create(CatalogAPI);
