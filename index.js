'use strict';

var catalogAPI = require('./lib/catalog');

function MagazineLuizaAPI(partnerId) {
	if(!this || !(this instanceof MagazineLuizaAPI)) {
		return new MagazineLuizaAPI();
	}

	this.order = {};
	this.catalog = catalogAPI.init(partnerId);
}

module.exports = MagazineLuizaAPI;
