'use strict';

var got = require('got'),
	core = require('./index'),

SoapAPI = {
	init(options) {
		const body = SoapAPI.getSenderXML(options),
			endpoint = options.endpoint,
			responseTag = options.responseTag || endpoint;

		return SoapAPI.makeRequest(endpoint, responseTag, body)
			.then(options.callback)
		;
	},

	getSenderXML(options) {
		return (
			`${SoapAPI.getHeader()}
				<${options.endpoint} xmlns="http://tempuri.org/">
					<strXML><![CDATA[
					<xml>
					<MagazineLuiza>
						${SoapAPI.getContent(options)}
					</MagazineLuiza>
					</xml>
					]]></strXML>
				</${options.endpoint}>
			${SoapAPI.getFooter()}`
		);
	},

	getHeader() {
		return (
			`<?xml version="1.0" encoding="utf-8"?>
			<soap:Envelope
				xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
				xmlns:xsd="http://www.w3.org/2001/XMLSchema"
				xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
				<soap:Body>`
		);
	},

	getFooter() {
		return `</soap:Body></soap:Envelope>`;
	},

	getContent(options) {
		const partnerId = SoapAPI.getPartnerIdTag(),
			id = SoapAPI.getProductId(options.id),
			model = SoapAPI.getProductModel(options.model),
			sessionKey = SoapAPI.getSessionKeyTag(options),
			cpf = SoapAPI.getCpfTag(options.cpf),
			quantity = SoapAPI.getQuantityTag(options.quantity),
			cep = SoapAPI.getCep(options.cep),
			address = SoapAPI.getAddress(options),
			phone = SoapAPI.getPhone(options),
			name = SoapAPI.getName(options.name),
			email = SoapAPI.getEmail(options.email),
			stateRegistration = SoapAPI.getStateRegistration(
				options.stateRegistration
			),
			partnerOrderNumber = SoapAPI.getPartnerOrderNumber(
				options.partnerOrderNumber
			),
			products = SoapAPI.getProducts(options.products),
			internalTag = SoapAPI.getInternalTag(options);

			return (
				`${internalTag.open()}
					${partnerId}
					${id}
					${model}
					${sessionKey}
					${cpf}
					${quantity}
					${cep}
					${address.street}
					${address.number}
					${address.complement}
					${address.district}
					${address.city}
					${address.state}
					${address.referency}
					${phone.ddd}
					${phone.number}
					${name}
					${email}
					${stateRegistration}
					${partnerOrderNumber}
					${products}
				${internalTag.close()}`
			);
	},

	getInternalTag(options) {
		const tags = {},
			cart = SoapAPI.getCartTag(options),
			endpoint = options.endpoint,
			internalTag = options.internalTag || endpoint;

		tags.open = cart.open() || `<${internalTag}>`;
		tags.close = cart.close() || `</${internalTag}>`;

		if(endpoint === 'ConsultaCEP') {
			tags.open = tags.close = '';
		}

		return {
			open: () => tags.open,
			close: () => tags.close
		};
	},

	getPartnerIdTag() {
		return `<IdResgateCampanha>${core.partnerId}</IdResgateCampanha>`;
	},

	getProductId(id) {
		return id ? `<Codigo>${id}</Codigo>` : '';
	},

	getProductModel(model) {
		return model ? `<Modelo>${model}</Modelo>` : '';
	},

	getSessionKeyTag(options) {
		return options.hasOwnProperty('sessionKey') ?
			`<Chave_sessao>${options.sessionKey}</Chave_sessao>` :
			'';
	},

	getCpfTag(cpf) {
		return cpf ? `<CPF>${cpf.replace(/\D/g, '')}</CPF>` : '';
	},

	getQuantityTag(quantity) {
		return quantity ? `<Quantidade>${quantity}</Quantidade>` : '';
	},

	getCep(cep) {
		return cep ? `<CEP>${cep.replace(/\D/g, '')}</CEP>` : '';
	},

	getAddress(options) {
		if(!options.address) {
			return '';
		}

		return {
			street: options.address ?
				`<Endereco>${options.address}</Endereco>` :
				'',
			number: options.number ? `<Numero>${options.number}</Numero>` : '',
			complement: options.complement ?
				`<Complemento></Complemento>` :
				'',
			district: options.district ?
				`<Bairro>${options.district}</Bairro>` :
				'',
			city: options.city ? `<Cidade>${options.city}</Cidade>` : '',
			state: options.state ? `<Estado>${options.state}</Estado>` : '',
			referency: options.referency ?
				`<ReferenciaEndereco>${options.referency}</ReferenciaEndereco>` :
				''
		};
	},

	getPhone(options) {
		const ddd = options.ddd,
			number = options.phone;

		return {
			ddd: ddd ? `<DDD>${ddd}</DDD>` : '',
			number: number ? `<Telefone>${number}</Telefone>` : ''
		};
	},

	getName(name) {
		return name ? `<Nome_Premiado>${name}</Nome_Premiado>` : '';
	},

	getEmail(email) {
		return email ? `<Email>${email}</Email>` : '';
	},

	getStateRegistration(number) {
		return number ? `<Inscricao>${number}</Inscricao>` : '';
	},

	getPartnerOrderNumber(number) {
		return number ? `<PedidoParceiro>${number}</PedidoParceiro>` : '';
	},

	getCartTag(options) {
		const hasSessionKey = options.hasOwnProperty('sessionKey');
		return {
			open: () => (hasSessionKey ? '<Carrinho>' : ''),
			close: () => (hasSessionKey ? '</Carrinho>' : '')
		};
	},

	getProducts(products) {
		if(!Array.isArray(products)) {
			return '';
		}

		const productsTags = products.map(product => {
			return (
				`<Produto>
					<Codigo>${product.id}</Codigo>
					<Modelo>${product.model}</Modelo>
					<Quantidade>${product.quantity}</Quantidade>
				</Produto>`
			);
		});

		return `<ListaProdutos>${productsTags.join('')}</ListaProdutos>`;

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
