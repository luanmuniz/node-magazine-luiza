'use strict';

var ColorsHelper = {
	parseObject(json) {
		let colors = json.xml['rs:data']['z:row'];
		colors = colors.map(color => {
			color = color.$;
			return {
				color: color.strCor,
				description: color.strDescricao
			};
		});

		return Promise.resolve(colors);
	}
};

module.exports = Object.create(ColorsHelper);
