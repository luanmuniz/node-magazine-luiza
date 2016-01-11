'use strict';

const CoreAPI = require('./lib/core');

function MagazineLuizaAPI(partnerId, env) {
	if(!this || !(this instanceof MagazineLuizaAPI)) {
		return new MagazineLuizaAPI(partnerId, env);
	}

	CoreAPI.init(partnerId, env);

	this.catalog = require('./lib/catalog');
}

module.exports = MagazineLuizaAPI;
