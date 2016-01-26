'use strict';

const calculateShipping = require('./calculate-shipping');

function checkout(magazineLuiza) {
	const order = magazineLuiza.order;
	return calculateShipping(magazineLuiza)
		.then(cart => {
			return order.checkout(Object.assign({}, cart, {
				address: {
					street: 'Rua Miguel Mentem',
					number: '100',
					complement: 'Sala 2',
					district: 'Vila Guilherme',
					city: 'São Paulo',
					state: 'SP',
					referency: 'Próximo à algum lugar',
				},
				phone: {
					ddd: '11',
					number: '999991234'
				},
				name: 'Maria Antonieta Silva',
				email: 'email@premiado.com',
				stateRegistration: 'ISENTO',
				partnerOrderNumber: Math.ceil(Math.random() * 9999)
			}))
		})
	;
}

module.exports = checkout;
