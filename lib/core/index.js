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
		categories: 'xmlCategorias.asp'
	},

	init(partnerId, env) {
		if(!partnerId) {
			console.log(errorHelper.errorObj.core.FORBIDDEN);
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

		return `${mainUrl}/${allUrls[type]}?IdResgateCampanha=${id}`;
	},

	makeRequest(method, type) {
		let url = CoreAPI.getUrl(type);

		return got[method](url)
			.then(CoreAPI.requestSuccess)
			.catch(err => CoreAPI.errorHandler('core', 'REQUEST_ERROR', err))
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

	toUtf8(string) {
		return decodeURIComponent(string);
	}

};

module.exports = Object.create(CoreAPI);
