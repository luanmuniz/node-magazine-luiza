'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;
const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID);

describe('# [API] MAGAZINE LUIZA - ORDER - CEP', function() {
	it('Should check if CEP is available to order', function() {
		return magazineLuiza.order.checkCep('04328030')
			.then(cep => {
				expect(cep).to.be.an('object');
			})
		;
	});
});
