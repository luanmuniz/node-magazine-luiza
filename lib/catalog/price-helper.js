'use strict';

var soap = require('../core/soap'),

PriceHelper = {
	makeRequest(id, model) {
		const endpoint = 'ConsultaPrecoProduto',
			body = soap.getSenderXML({ id, model, endpoint });

		return soap.makeRequest(endpoint, body)
			.then(PriceHelper.parseObject)
		;
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
