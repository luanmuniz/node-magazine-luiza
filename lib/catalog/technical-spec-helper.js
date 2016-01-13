'use strict';

var cheerio = require('cheerio'),

TechnicalSpecHelper = {
	init(productID, productModel) {
		TechnicalSpecHelper.productID = productID;
		TechnicalSpecHelper.productModel = productModel;
	},

	requestSuccess(data) {
		let $ = cheerio.load(data),
			$li = $('li'),
			map = Array.prototype.map,
			productSpecs = {};

		productSpecs.product = {
			id: TechnicalSpecHelper.productID,
			model: TechnicalSpecHelper.productModel
		};

		productSpecs.specs = map.call($li, TechnicalSpecHelper.getSpecs);
		return Promise.resolve(productSpecs);
	},

	getSpecs(item) {
		let data = item.children[0].data,
			clearData = TechnicalSpecHelper.clearSpecialChars(data);

		return {
			title: clearData[1].trim(),
			description: clearData[2].trim()
		};
	},

	clearSpecialChars(string) {
		return string
			.replace(/^[\n\t\s]+/g, '')
			.replace(/[\n\t\s]+$/g, '')
			.replace(/\t+/g, '')
			.split(/^(.+?):/);
	}
};

module.exports = Object.create(TechnicalSpecHelper);
