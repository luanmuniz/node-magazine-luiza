'use strict';

var soap = require('../core/soap'),

StockHelper = {
	makeRequest(id, model, quantity) {
		const endpoint = 'ConsultaProduto',
			body = soap.getSenderXML({ id, model, quantity, endpoint });

		return soap.makeRequest(endpoint, body)
			.then(StockHelper.parseObject)
		;
	},

	parseObject(product) {
		return {
			productId: product.Codigo,
			productModel: product.Modelo,
			productQuantity: product.Quantidade,
			partnerId: product.IdResgateCampanha,
			available: StockHelper.isProductAvailable(product.Liberado),
			status: product.idStatus,
			message: product.Mensagem,
			needsMount: StockHelper.needsMount(product.tem_montagem)
		};
	},

	isProductAvailable(status) {
		return !!Number(status);
	},

	needsMount(status) {
		return !!Number(status);
	}
};

module.exports = Object.create(StockHelper);
