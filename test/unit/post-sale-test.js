'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const magazineLuiza = new MagazineLuizaAPI('0000');

describe('# MAGAZINE LUIZA API - POST SALE', function() {
	it('Should MagazineLuizaAPI has ownProperty postSale', function() {
		expect(magazineLuiza).has.ownProperty('postSale');
	});

	it('Should postSale to be an object', function() {
		expect(magazineLuiza.postSale).to.be.an('object');
	});
});
