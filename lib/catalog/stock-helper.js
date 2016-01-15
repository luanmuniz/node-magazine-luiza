'use strict';

var got = require('got'),
	core = require('../core'),

StockHelper = {
	makeRequest(id, model, quantity) {
		const endpoint = 'mlCorpPlataformaWS/wsCorpPlataforma.asmx',
			options = {};

		options.headers = {
			SOAPAction:  'http://tempuri.org/ConsultaProduto',
			'Content-Type': 'text/xml'
		};
		options.body = StockHelper.getSenderXML(id, model, quantity);

		return got.post(`${core.mainUrl}/${endpoint}`, options)
			.then(xml => core.requestSuccess(xml.body))
			.then(json => {
				const mainNode = json
					['soap:Envelope']
					['soap:Body']
					.ConsultaProdutoResponse
					.ConsultaProdutoResult
					['diffgr:diffgram']
					.XML
					.MagazineLuiza
					.ConsultaProduto;
				return StockHelper.parseObject(mainNode);
			})
		;
	},

	parseObject(product) {
		return {
			productId: product.Codigo,
			productModel: product.Modelo,
			productQuantity: product.Quantidade,
			partnerId: product.IdResgateCampanha,
			available: StockHelper.isProductAvailable(product.Liberado),
			status: StockHelper.getProductStatus(product.idStatus),
			message: product.Mensagem,
			needsMount: StockHelper.needsMount(product.tem_montagem)
		};
	},

	isProductAvailable(status) {
		return !!Number(status);
	},

	getProductStatus(status) {
		return {
			'-1': 'Falha na execução do Webmétodo',
			'0': 'Operação realizada com sucesso',
			'2': 'Campanha inexistente ou expirada',
			'3': 'Produto e/ou modelo inexistente'
		}[status];
	},

	needsMount(status) {
		return !!Number(status);
	},

	getSenderXML(id, model, quantity) {
		return `<?xml version="1.0" encoding="utf-8"?>
			<soap:Envelope
				xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
				xmlns:xsd="http://www.w3.org/2001/XMLSchema"
				xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
			>
				<soap:Body>
				<ConsultaProduto xmlns="http://tempuri.org/">
				<strXML><![CDATA[
				<xml>
				<MagazineLuiza>
					<ConsultaProduto>
						<Codigo>${id}</Codigo>
						<Modelo>${model}</Modelo>
						<IdResgateCampanha>${core.partnerId}</IdResgateCampanha>
						<Quantidade>${quantity}</Quantidade>
					</ConsultaProduto>
				</MagazineLuiza>
				</xml>
				]]></strXML>
				</ConsultaProduto>
				</soap:Body>
			</soap:Envelope>`
		;
	}
};

module.exports = Object.create(StockHelper);
