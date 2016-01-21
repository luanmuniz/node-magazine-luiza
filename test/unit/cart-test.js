'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const magazineLuiza = new MagazineLuizaAPI('0000', 'development');

describe('# MAGAZINE LUIZA API - ORDER - CART', function() {
	it('Should order has ownProperty createCart()', function() {
		expect(magazineLuiza.order).to.have.a.property('createCart');
	});
});
