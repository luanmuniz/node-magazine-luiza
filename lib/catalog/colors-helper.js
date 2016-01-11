'use strict';

var core = require('../core'),

ColorsHelper = {
	parseObject(json) {
		let colors = json.xml['rs:data']['z:row'];
		colors = colors.map(color => {
			color = color.$;
			return {
				color: color.strCor,
				description: core.toUtf8(color.strDescricao)
			};
		});

		return Promise.resolve(colors);
	}
};

module.exports = Object.create(ColorsHelper);
