'use strict';

const core = require('../core'),
	soap = require('../core/soap'),

StockHelper = {
	makeRequest(id, model, quantity) {
		return soap.init({
			xmlBody: StockHelper.getXmlBody(id, model, quantity),
			endpoint: 'ConsultaProduto',
			callback: StockHelper.parseObject
		});
	},

	getXmlBody(id, model, quantity) {
		return {
			ConsultaProduto: {
				IdResgateCampanha: core.partnerId,
				Codigo: id,
				Modelo: model,
				Quantidade: quantity
			}
		};
	},

	parseObject(product) {
		if(+product.idStatus !== 0) {
			return core.responseError(product);
		}

		return {
			productId: product.Codigo,
			productModel: product.Modelo,
			productQuantity: +product.Quantidade,
			partnerId: product.IdResgateCampanha,
			available: core.stringNumberToBoolean(product.Liberado),
			status: +product.idStatus,
			message: product.Mensagem,
			needsMount: core.stringNumberToBoolean(product.tem_montagem)
		};
	}
};

module.exports = Object.create(StockHelper);
