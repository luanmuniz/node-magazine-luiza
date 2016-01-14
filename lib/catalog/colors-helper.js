'use strict';

var core = require('../core'),

ColorsHelper = {
	parseObject(colorsNode) {
		let colors = core.getMainNodeInfo(colorsNode, color => {
			return {
				color: color.strCor,
				description: core.toUtf8(color.strDescricao)
			};
		});

		return Promise.resolve(colors);
	}
};

module.exports = Object.create(ColorsHelper);
