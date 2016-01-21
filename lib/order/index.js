'use strict';

var core = require('../core'),
	cepHelper = require('./cep-helper'),

OrderAPI = {
    checkCep(cep) {
		if(!cep) {
			return core.errorHandler('order', 'MISSING_CEP');
		}
		return cepHelper.makeRequest(cep);
    },

	createCart() {

	}
};

module.exports = Object.create(OrderAPI);
