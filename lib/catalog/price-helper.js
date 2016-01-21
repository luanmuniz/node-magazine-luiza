'use strict';

var soap = require('../core/soap'),

PriceHelper = {
	makeRequest(id, model) {
		return soap.init({
			id,
			model,
			endpoint: 'ConsultaPrecoProduto',
			callback: PriceHelper.parseObject
		});
	},

	parseObject(productPrice) {
		return {
			productId: productPrice.Codigo,
			productModel: productPrice.Modelo,
			valueBrl: productPrice.Valor_Reais,
			valueCurrency: productPrice.Valor_Moeda,
			partnerId: productPrice.IdResgateCampanha,
			status: productPrice.idStatus,
			message: productPrice.Mensagem
		};
	}
};

module.exports = Object.create(PriceHelper);
