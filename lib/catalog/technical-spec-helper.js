'use strict';

var cheerio = require('cheerio'),

TechnicalSpecHelper = {
	requestSuccess(data) {
		let $ = cheerio.load(data),
			$li = $('li'),
			map = Array.prototype.map,
			specs = map.call($li, TechnicalSpecHelper.getSpecs);

		return Promise.resolve(specs);
	},

	getSpecs(item) {
		let data = item.children[0].data,
			clearData = TechnicalSpecHelper.clearSpecialChars(data);

		return {
			title: clearData[1],
			description: clearData[2]
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
