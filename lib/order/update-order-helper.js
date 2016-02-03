'use strict';

const core = require('../core'),
	soap = require('../core/soap'),

UpdateHelper = {
	makeRequest(order) {
		return soap.init(Object.assign({}, order, {
			xmlBody: UpdateHelper.getXmlBody(order),
			endpoint: 'AprovaPedido',
			responseTag: 'Pedidos',
			callback: UpdateHelper.parseObject
		}));
	},

	getXmlBody(order) {
		return {
			Pedidos: {
				IdResgateCampanha: core.partnerId,
				CPF: order.cpf,
				Pedido: order.orderNumber,
				Aprovado: +order.approved
			}
		};
	},

	parseObject(json) {
		if(+json.idStatus !== 0) {
			return core.responseError(json);
		}

		return {
			cpf: json.CPF,
			partnerId: json.IdResgateCampanha,
			orderNumber: json.Pedido,
			status: +json.idStatus,
			message: json.Mensagem
		};
	}
};

module.exports = Object.create(UpdateHelper);
