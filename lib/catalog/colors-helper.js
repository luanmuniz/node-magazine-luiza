'use strict';

const core = require('../core'),

ColorsHelper = {
	parseObject(colorsNode) {
		const colors = core.getMainNodeInfo(colorsNode, color => {
			return {
				color: color.strCor,
				description: core.toUtf8(color.strDescricao)
			};
		});

		return Promise.resolve(colors);
	}
};

module.exports = Object.create(ColorsHelper);
