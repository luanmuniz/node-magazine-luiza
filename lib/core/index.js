'use strict';

var got = require('got'),
	xml2js = require('xml2js'),
	parser = new xml2js.Parser({
		explicitArray: false,
		attrValueProcessors: [ xml2js.processors.parseBooleans ]
	}),

CoreAPI = {
	mainUrl: 'http://corporativo.magazineluiza.com.br',
	errorHandler: require('./error-helper').errorHandler,
	allUrls: {
		products: 'xmlCatalogo.asp',
		color: 'xmlCor.asp',
		categories: 'xmlCategorias.asp'
	},

	init(partnerId) {
		CoreAPI.partnerId = partnerId;
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
