'use strict';

const expect = require('chai').expect;
const MagazineLuizaAPI = require('../../index');
const magazineLuiza = new MagazineLuizaAPI('0000');

describe('# MAGAZINE LUIZA API - ORDER - UPDATE ORDER', function() {
	it('Should order has ownProperty updateOrder', function() {
		expect(magazineLuiza.order).to.have.a.property('update');
	});
});
