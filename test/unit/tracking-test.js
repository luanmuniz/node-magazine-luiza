'use strict';

require('../mock/got-mock');
const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const trackingResult = require('../mock/json/tracking-result.json');
const trackingHelper = require('../../lib/post-sale/tracking-helper');

describe('# MAGAZINE LUIZA API - POST SALE - TRACKING', function() {
	let magazineLuiza;

	beforeEach(function() {
		magazineLuiza = new MagazineLuizaAPI('0000');
	});

	const errorRequest = (options, message) => {
		return magazineLuiza.postSale.tracking(options)
			.catch(err => expect(err.message).to.be.equal(message))
		;
	};

	it('Should postSale has ownProperty tracking', function() {
		expect(magazineLuiza.postSale).to.have.a.property('tracking');
	});

	it('Should return an error if parameter don\'t be an object', function() {
		return errorRequest(
			null,
			'You must pass an object with `cpf` and `orderNumber` properties'
		);
	});

	it('Should return an error if dont pass CPF', function() {
		return errorRequest(
			{ orderNumber: '123' },
			'You must pass the CPF or CNPJ'
		);
	});

	it('Should return an error if dont pass orderNumber', function() {
		return errorRequest(
			{ cpf: '11111111111' },
			'You must pass the orderNumber'
		);
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
	});

	it('Should return an error if returned status is different from zero',
	function() {
		const options = {
			idStatus: '1',
			Mensagem: 'Some error message'
		};

		return trackingHelper.parseObject(options)
			.catch(err => {
				expect(err.err).to.contains.all.keys('status', 'message');
			})
		;
	});
});
