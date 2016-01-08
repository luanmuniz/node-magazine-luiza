'use strict';

const CoreAPI = require('./lib/core');

function MagazineLuizaAPI(partnerId) {
	if(!this || !(this instanceof MagazineLuizaAPI)) {
		return new MagazineLuizaAPI();
	}

	CoreAPI.init(partnerId);

	this.catalog = require('./lib/catalog');
}

module.exports = MagazineLuizaAPI;
