'use strict';

var coreAPI = require('../core'),
	catalogHelper = require('./helper'),

CatalogAPI = {
	getProducts() {
		return coreAPI.makeRequest('get', 'products')
			.then(json  => catalogHelper.parseObject(json))
		;
	},

	getColors() {

	}
};

module.exports = Object.create(CatalogAPI);
