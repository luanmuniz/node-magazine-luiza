'use strict';

const core = require('../core'),
	soap = require('../core/soap'),

CepHelper = {
	makeRequest(cep) {
		return soap.init({
			xmlBody: CepHelper.getXmlBody(cep),
			endpoint: 'ConsultaCEP',
			callback: CepHelper.parseObject
		});
	},

	getXmlBody(cep) {
		return {
			IdResgateCampanha: core.partnerId,
			CEP: cep
		};
	},

	parseObject(response) {
		if(+response.idStatus !== 0) {
			return core.responseError(response);
		}

		return {
			cep: response.CEP,
			partnerId: response.IdResgateCampanha,
			status: +response.idStatus,
			message: response.Mensagem
		};
	}
};

module.exports = Object.create(CepHelper);
