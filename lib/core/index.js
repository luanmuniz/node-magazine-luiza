'use strict';

const got = require('got'),
	xml2js = require('xml2js'),
	iconv = require('iconv-lite'),
	errorHelper = require('./error-helper'),
	parser = new xml2js.Parser({
		explicitArray: false,
		attrValueProcessors: [ xml2js.processors.parseBooleans ]
	}),

CoreAPI = {
	prodUrl: 'https://corporativo.magazineluiza.com.br',
	devUrl: 'http://b2b-xml.sandbox.luizalabs.com',
	errorHandler: errorHelper.errorHandler,
	allUrls: {
		products: 'xmlCatalogo.asp',
		colors: 'xmlCor.asp',
		categories: 'xmlCategorias.asp',
		technicalSpec: 'Produto/FichaTecnicaCorp.asp'
	},

	init(partnerId, env) {
		if(!partnerId) {
			throw new Error(errorHelper.errorObj.core.FORBIDDEN);
		}

		CoreAPI.partnerId = partnerId;
		CoreAPI.mainUrl = env === 'development' ?
			CoreAPI.devUrl :
			CoreAPI.prodUrl;
		return CoreAPI;
	},

	getUrl(type) {
		const id = CoreAPI.partnerId,
			mainUrl = CoreAPI.mainUrl,
			allUrls = CoreAPI.allUrls;

		if(!allUrls[type]) {
			return;
		}

		return `${mainUrl}/${allUrls[type]}?IdResgateCampanha=${id}`;
	},

	makeRequest(method, type, options) {
		const url = CoreAPI.getUrl(type),
			encoding = options && options.encoding;

		if(!url) {
			return CoreAPI.errorHandler('core', 'WRONG_URL');
		}

		return got[method](url, { encoding: encoding ? null : 'utf8' })
			.then(data => {
				const decodedData = encoding ?
					iconv.decode(data.body, encoding) :
					data.body;

				return CoreAPI.requestSuccess(decodedData);
			})
		;
	},

	requestSuccess(data) {
		return new Promise((resolve, reject) => {
			parser.parseString(data, (err, result) => {
				if(err) {
					return reject(err);
				}
				return resolve(result);
			});
		});
	},

	getMainNodeInfo(jsonNode, callback) {
		const mainNode = jsonNode.xml['rs:data']['z:row'];
		return mainNode.map(node => callback(node.$));
	},

	responseError(object) {
		return CoreAPI.errorHandler('core', 'API_ERROR', {
			status: object.idStatus,
			message: object.Mensagem,
			mainResponse: object
		});
	},

	toUtf8(string) {
		try {
			return decodeURIComponent(string);
		} catch(e) {
			return string;
		}
	},

	justNumbers(string) {
		return String(string).replace(/\D/g, '');
	},

	is(type, object) {
		type = type[0].toUpperCase() + type.slice(1);
		const toString = Object.prototype.toString;
		return toString.call(object) === `[object ${type}]`;
	},

	isCnpj(number) {
		return number.length === 14;
	},

	isCpf(number) {
		return number.length === 11;
	},

	toArray(object) {
		return CoreAPI.is('array', object) ? object : [ object ];
	},

	stringNumberToBoolean(string) {
		return Boolean(Number(string));
	},

	newArray(length) {
		return Array.apply(null, { length });
	}
};

module.exports = Object.create(CoreAPI);
