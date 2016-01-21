'use strict';

var soap = require('../core/soap'),

CepHelper = {
	makeRequest(cep) {
		const endpoint = 'ConsultaCEP',
			body = soap.getSenderXML({ cep, endpoint });

		return soap.makeRequest(endpoint, body)
			.then(CepHelper.parseObject)
		;
	},

	parseObject(response) {
		return {
			cep: response.CEP,
			parnterId: response.IdResgateCampanha,
			status: response.idStatus,
			message: response.Mensagem
		};
	}
};

module.exports = Object.create(CepHelper);
