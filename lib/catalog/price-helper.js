'use strict';

const core = require('../core'),
	soap = require('../core/soap'),

PriceHelper = {
	makeRequest(id, model) {
		return soap.init({
			xmlBody: PriceHelper.getXmlBody(id, model),
			endpoint: 'ConsultaPrecoProduto',
			callback: PriceHelper.parseObject
		});
	},

	getXmlBody(id, model) {
		return {
			ConsultaPrecoProduto: {
				IdResgateCampanha: core.partnerId,
				Codigo: id,
				Modelo: model
			}
		};
	},

	parseObject(productPrice) {
		if(+productPrice.idStatus !== 0) {
			return core.responseError(productPrice);
		}

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
