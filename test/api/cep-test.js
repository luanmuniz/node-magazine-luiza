'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;
const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID, 'development');

describe('# [API] MAGAZINE LUIZA - ORDER - CEP', function() {
	this.timeout(60000);

	let result;
	before(function() {
		return magazineLuiza.order.checkCep('04328030').then(cep => {
			result = cep;
		});
	});

	it('Should result to be an object', function() {
		expect(result).to.be.an('object');
	});

	it('Should result has properties cep, partnerId, status and message',
	function() {
		expect(result).to.have.all.keys(
			'cep',
			'partnerId',
			'status',
			'message'
		);
	});
});
