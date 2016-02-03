'use strict';

const cheerio = require('cheerio'),
	got = require('got'),
	core = require('../core'),

TechnicalSpecHelper = {
	makeRequest(productId, productModel) {
		let url = core.getUrl('technicalSpec'),
		callbackSuccess = TechnicalSpecHelper.requestSuccess(
			productId,
			productModel
		);

		url += `&Codigo=${productId}${productModel}`;

		return got.get(url).then(callbackSuccess);
	},

	requestSuccess(productId, productModel) {
		return (data) => {
			const $ = cheerio.load(data.body),
				$li = $('li'),
				map = Array.prototype.map,
				productSpecs = {};

			if(!$li.length) {
				return core.errorHandler('product', 'NO_TECH_SPEC');
			}

			productSpecs.product = {
				id: productId,
				model: productModel
			};

			productSpecs.specs = map.call($li, TechnicalSpecHelper.getSpecs);
			return Promise.resolve(productSpecs);
		};
	},

	getSpecs(item) {
		const data = item.children[0].data,
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
