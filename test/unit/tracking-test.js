'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const magazineLuiza = new MagazineLuizaAPI('0000');
const trackingResult = require('../mock/json/tracking-result.json');

describe('# MAGAZINE LUIZA API - POST SALE - TRACKING', function() {
	it('Should postSale has ownProperty tracking', function() {
		expect(magazineLuiza.postSale).to.have.a.property('tracking');
	});

	it('Should tracking() method return track informations about order',
	function() {
		const options = {
			cpf: '11111111111',
			orderNumber: '11111111'
		};

		return magazineLuiza.postSale.tracking(options)
			.then(track => {
				expect(track).to.be.deep.equal(trackingResult);
			})
		;
	})
});
