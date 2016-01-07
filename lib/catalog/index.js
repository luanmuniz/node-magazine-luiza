'use strict';

var catalogHelper = require('./helper'),

CatalogAPI = {
	init(id) {
		catalogHelper = catalogHelper.init(id);
		return CatalogAPI;
	},

	getFullCatalog() {
		return catalogHelper.makeRequest('full')
			.then(json  => catalogHelper.parseObject(json));
		;
	},

	getColors() {},
	getCategories() {},
	getProductInfo() {},
	getStockAvailability() {},
	getPrice() {}
};

module.exports = Object.create(CatalogAPI);
