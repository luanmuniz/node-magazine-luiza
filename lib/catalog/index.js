'use strict';

var coreAPI = require('../core'),
	catalogHelper = require('./helper'),

CatalogAPI = {
	getProducts() {
		return coreAPI.makeRequest('get', 'products')
			.then(json  => catalogHelper.parseObject(json))
		;
	}
};

module.exports = Object.create(CatalogAPI);
