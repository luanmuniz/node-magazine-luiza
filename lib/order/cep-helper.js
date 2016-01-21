'use strict';

var soap = require('../core/soap'),

CepHelper = {
	makeRequest(cep) {
		return soap.init({
			cep,
			endpoint: 'ConsultaCEP',
			callback: CepHelper.parseObject
		});
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
