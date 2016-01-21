'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const checkCepResult = require('../mock/json/check-cep-result.json');
const magazineLuiza = new MagazineLuizaAPI('0000');

describe('# MAGAZINE LUIZA API - ORDER - CEP', function() {
	it('Should order has a method checkCep()', function() {
		expect(magazineLuiza.order).to.have.a.property('checkCep');
	});

	it('Should checkCep() return an error if CEP is not passed', function() {
		return magazineLuiza.order.checkCep()
			.catch(err => {
				expect(err.message).to.be.equal('You must pass a valid CEP');
			})
		;
	});

	it('Should checkCep() return the order availability to CEP passed',
	function() {
		return magazineLuiza.order.checkCep('04328030')
			.then(cep => {
				expect(cep).to.be.deep.equal(checkCepResult);
			});
		;
	});
});
