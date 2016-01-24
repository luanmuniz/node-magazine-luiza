'use strict';

const CheckHelper = {
	hasSessionKey(key) {
		return key !== undefined;
	},

	allProductsHaveAnId(products) {
		return !products.some(product => !product.id);
	},

	allProductsHaveAModel(products) {
		return !products.some(product => !product.model);
	},

	allProductsHaveQuantity(products) {
		return !products.some(product => !product.quantity);
	}
};

module.exports = Object.create(CheckHelper);
