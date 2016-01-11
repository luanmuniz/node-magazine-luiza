'use strict';

const CoreAPI = require('./lib/core');

function MagazineLuizaAPI(partnerId, env) {
	if(!this || !(this instanceof MagazineLuizaAPI)) {
		return new MagazineLuizaAPI();
	}

	CoreAPI.init(partnerId, env);

	this.catalog = require('./lib/catalog');
	this.colors = {};
}

module.exports = MagazineLuizaAPI;
