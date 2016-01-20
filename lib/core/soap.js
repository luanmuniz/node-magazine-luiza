'use strict';

var got = require('got'),
	core = require('./index'),

SoapAPI = {
	getSenderXML(options) {
		const endpoint = options.endpoint,
			quantity = SoapAPI.getQuantityTag(options.quantity);

		return `<?xml version="1.0" encoding="utf-8"?>
			<soap:Envelope
				xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
				xmlns:xsd="http://www.w3.org/2001/XMLSchema"
				xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
			>
				<soap:Body>
				<${endpoint} xmlns="http://tempuri.org/">
				<strXML><![CDATA[
				<xml>
				<MagazineLuiza>
					<${endpoint}>
						<Codigo>${options.id}</Codigo>
						<Modelo>${options.model}</Modelo>
						<IdResgateCampanha>${core.partnerId}</IdResgateCampanha>
						${quantity}
					</${endpoint}>
				</MagazineLuiza>
				</xml>
				]]></strXML>
				</${endpoint}>
				</soap:Body>
			</soap:Envelope>`
		;
	},

	getQuantityTag(quantity) {
		return quantity ? `<Quantidade>${quantity}</Quantidade>` : '';
	},

	makeRequest(endpoint, body) {
		const url = `${core.mainUrl}/mlCorpPlataformaWS/wsCorpPlataforma.asmx`,
			options = {};

		options.headers = {
			SOAPAction: `http://tempuri.org/${endpoint}`,
			'Content-Type': 'text/xml'
		};
		options.body = body;

		return got.post(url, options)
			.then(xml => core.requestSuccess(xml.body))
			.then(json => {
				return json
				['soap:Envelope']
				['soap:Body']
				[`${endpoint}Response`]
				[`${endpoint}Result`]
				['diffgr:diffgram']
				.XML
				.MagazineLuiza
				[endpoint]
			;
			})
		;
	}
};

module.exports = Object.create(SoapAPI);
