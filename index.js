'use strict';

const CoreAPI = require('./lib/core'),
	catalog = require('./lib/catalog'),
	order = require('./lib/order'),
	postSale = require('./lib/post-sale');

function MagazineLuizaAPI(partnerId, env) {
	if(!this || !(this instanceof MagazineLuizaAPI)) {
		return new MagazineLuizaAPI(partnerId, env);
	}

	CoreAPI.init(partnerId, env);

	this.catalog = catalog;
	this.order = order;
	this.postSale = postSale;
}

module.exports = MagazineLuizaAPI;
