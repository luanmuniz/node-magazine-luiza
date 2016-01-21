'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const magazineLuiza = new MagazineLuizaAPI('0000');

describe('# MAGAZINE LUIZA API - ORDER', function() {

	it('Should MagazineLuizaAPI has ownProperty order', function() {
		expect(magazineLuiza).has.ownProperty('order');
	});

	it('Should order to be an object', function() {
		expect(magazineLuiza.order).to.be.an('object');
	});
});
