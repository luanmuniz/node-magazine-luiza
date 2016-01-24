'use strict';

const CoreAPI = require('./lib/core'),
	catalog = require('./lib/catalog'),
	order = require('./lib/order');

function MagazineLuizaAPI(partnerId, env) {
	if(!this || !(this instanceof MagazineLuizaAPI)) {
		return new MagazineLuizaAPI(partnerId, env);
	}

	CoreAPI.init(partnerId, env);

	this.catalog = catalog;
	this.order = order;
}

module.exports = MagazineLuizaAPI;
