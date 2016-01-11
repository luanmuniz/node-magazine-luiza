'use strict';

var core = require('../core'),

CategoriesHelper = {
	parseObject(json) {
		let categories = json.xml['rs:data']['z:row'];
		categories = categories.map(category => {
			category = category.$;
			return {
				categoryID: category.strLinha,
				categoryDescription: core.toUtf8(category.Descricaolinha),
				subcategoryID: category.strSetor,
				subcategoryDescription: core.toUtf8(category.strDescricao)
			};
		});

		return Promise.resolve(categories);
	}
};

module.exports = Object.create(CategoriesHelper);
