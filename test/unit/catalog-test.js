'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const magazineLuiza = new MagazineLuizaAPI('0000');

describe('# MAGAZINE LUIZA API - CATALOG', function() {
	it('Should MagazineLuizaAPI has ownProperty catalog', function() {
		expect(magazineLuiza).has.ownProperty('catalog');
	});

	it('Should catalog to be an object', function() {
		expect(magazineLuiza.catalog).to.be.an('object');
	});
});
