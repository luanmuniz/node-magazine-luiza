'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const magazineLuiza = new MagazineLuizaAPI('0000');
const approveResult = require('../mock/json/approve-result.json');
const updateHelper = require('../../lib/order/update-order-helper');

describe('# MAGAZINE LUIZA API - ORDER - UPDATE ORDER', function() {
	it('Should order has ownProperty update', function() {
		expect(magazineLuiza.order).to.have.a.property('update');
	});

	it('Should "update" method update order status', function() {
		const order = {
			cpf: '01010101078',
			orderNumber: '20136154',
			approved: true
		};

		return magazineLuiza.order.update(order)
			.then(order => expect(order).to.be.deep.equal(approveResult))
		;
	});

	it('Should return an error if returned status is different from zero',
	function() {
		const options = {
			idStatus: '1',
			Mensagem: 'Some error message'
		};

		return updateHelper.parseObject(options)
			.catch(err => {
				expect(err.err).to.contains.all.keys('status', 'message');
			})
		;
	});
});
