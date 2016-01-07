'use strict';

var catalogAPI = require('./lib/catalog');

function MagazineLuizaAPI(args) {
	if(!this || !(this instanceof MagazineLuizaAPI)) {
		return new MagazineLuizaAPI();
	}

	this.order = {};
	this.catalog = catalogAPI.init(args);
}

module.exports = MagazineLuizaAPI;
