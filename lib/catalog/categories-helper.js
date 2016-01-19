'use strict';

var core = require('../core'),

CategoriesHelper = {
	parseObject(categoriesNode) {
		let categories = core.getMainNodeInfo(categoriesNode, category => {
			return {
				categoryId: category.strLinha,
				categoryDescription: core.toUtf8(category.Descricaolinha),
				subcategoryId: category.strSetor,
				subcategoryDescription: core.toUtf8(category.strDescricao)
			};
		});

		return Promise.resolve(categories);
	}
};

module.exports = Object.create(CategoriesHelper);
