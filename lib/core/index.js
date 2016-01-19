'use strict';

var got = require('got'),
	xml2js = require('xml2js'),
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
		let id = CoreAPI.partnerId,
			mainUrl = CoreAPI.mainUrl,
			allUrls = CoreAPI.allUrls;

		if(!allUrls[type]) {
			return;
		}

		return `${mainUrl}/${allUrls[type]}?IdResgateCampanha=${id}`;
	},

	makeRequest(method, type) {
		let url = CoreAPI.getUrl(type);

		if(!url) {
			return CoreAPI.errorHandler('core', 'WRONG_URL');
		}

		return got[method](url)
			.then(data => {
				return CoreAPI.requestSuccess(data.body);
			})
			.catch(err => {
				return CoreAPI.errorHandler('core', 'REQUEST_ERROR', err);
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
		let mainNode = jsonNode.xml['rs:data']['z:row'];
		return mainNode.map(node => callback(node.$));
	},

	toUtf8(string) {
		try { return decodeURIComponent(string); }
		catch(e) { return string; }
	}

};

module.exports = Object.create(CoreAPI);
