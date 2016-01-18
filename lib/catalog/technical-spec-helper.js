'use strict';

var cheerio = require('cheerio'),
	got = require('got'),
	core = require('../core'),

TechnicalSpecHelper = {
	makeRequest(productID, productModel) {
		let url = core.getUrl('technicalSpec'),
		callbackSuccess = TechnicalSpecHelper.requestSuccess(
			productID,
			productModel
		);

		url += `&Codigo=${productID}${productModel}`;

		return got.get(url).then(callbackSuccess);
	},

	requestSuccess(productID, productModel) {
		return (data) => {
			let $ = cheerio.load(data.body),
				$li = $('li'),
				map = Array.prototype.map,
				productSpecs = {};

			if(!$li.length) {
				return core.errorHandler('product', 'NO_TECH_SPEC');
			}

			productSpecs.product = {
				id: productID,
				model: productModel
			};

			productSpecs.specs = map.call($li, TechnicalSpecHelper.getSpecs);
			return Promise.resolve(productSpecs);
		};
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
