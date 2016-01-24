'use strict';

var got = require('got'),
	xml2js = require('xml2js'),
	core = require('./index'),
	builder = new xml2js.Builder({
		rootName: 'MagazineLuiza',
		headless: true
	}),

SoapAPI = {
	init(options) {
		const body = SoapAPI.getSenderXML(options),
			endpoint = options.endpoint,
			responseTag = options.responseTag || endpoint;

		console.log(body);
		return SoapAPI.makeRequest(endpoint, responseTag, body)
			.then(options.callback)
		;
	},

	getSenderXML(options) {
		const body = builder.buildObject(options.xmlBody);

		return `<?xml version="1.0" encoding="utf-8"?>
			<soap:Envelope
				xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
				xmlns:xsd="http://www.w3.org/2001/XMLSchema"
				xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
				<soap:Body>
				<${options.endpoint} xmlns="http://tempuri.org/">
					<strXML><![CDATA[<xml>${body}</xml>]]></strXML>
				</${options.endpoint}>
				</soap:Body>
			</soap:Envelope>`
		;
	},

	makeRequest(endpoint, responseTag, body) {
		const url = `${core.mainUrl}/mlCorpPlataformaWS/wsCorpPlataforma.asmx`,
			options = {};

		options.headers = {
			SOAPAction: `http://tempuri.org/${endpoint}`,
			'Content-Type': 'text/xml'
		};
		options.body = body;

		return got.post(url, options)
			.then(xml => {
				return core.requestSuccess(xml.body);
			})
			.then(json => {
				return json
				['soap:Envelope']
				['soap:Body']
				[`${endpoint}Response`]
				[`${endpoint}Result`]
				['diffgr:diffgram']
				.XML
				.MagazineLuiza
				[responseTag]
			;
			})
		;
	}
};

module.exports = Object.create(SoapAPI);
