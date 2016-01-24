'use strict';

var core = require('../core'),
	cepHelper = require('./cep-helper'),
	cartHelper = require('./cart-helper'),
	checkoutHelper = require('./checkout-helper'),
	updateHelper = require('./update-order-helper'),

OrderAPI = {
    checkCep(cep) {
		if(!cep) {
			return core.errorHandler('order', 'MISSING_CEP');
		}
		return cepHelper.makeRequest(cep);
    },

	calculateShipping(options) {
		return cartHelper.calculateShipping(options);
	},

	checkout(cart) {
		return checkoutHelper.makeRequest(cart);
	},

	update(order) {
		return updateHelper.makeRequest(order);
	}
};

module.exports = Object.create(OrderAPI);
