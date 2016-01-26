'use strict';

const getProducts = require('./get-products');

function calculateShipping(magazineLuiza) {
	return getProducts(magazineLuiza)
		.then(products => {
			const cart = {
				sessionKey: 0,
				cpf: '911.850.433.73',
				cep: '17120-000',
				products: [{
					id: products[0].id,
					model: products[0].model,
					quantity: 2
				},{
					id: products[1].id,
					model: products[1].model,
					quantity: 3
				}]
			};

			return magazineLuiza.order.calculateShipping(cart);
		})
	;
}

module.exports = calculateShipping;
