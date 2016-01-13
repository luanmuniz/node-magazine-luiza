'use strict';

var cheerio = require('cheerio'),

TechnicalSpecHelper = {
	requestSuccess(data) {
		let $ = cheerio.load(data),
			$li = $('li'),
			specs = [];

		$li.each((index, element) => {
			let keyValue = $(element).text().split(/\:/),
				key = TechnicalSpecHelper.clearSpecialChars(keyValue[0]),
				value = TechnicalSpecHelper.clearSpecialChars(keyValue[1]);

			specs[index] = {};
			specs[index][key] = value;
		});

		return specs;
	},

	clearSpecialChars(string) {
		return string
			.replace(/^[\n\t\s]+/g, '')
			.replace(/[\n\t\s]+$/g, '');
	},

	parseObject(json) {
		return Promise.resolve(json);
	}
};

module.exports = Object.create(TechnicalSpecHelper);
