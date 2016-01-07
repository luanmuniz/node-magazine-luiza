'use strict';

var got = require('got'),
	parser = require('xml2js').parseString,
	errorHandler = require('../core/helper'),
	mainUrl = require('../core').mainUrl,

CatalogHelper = {
	init(partnerId) {
		CatalogHelper.partnerId = partnerId;
		return CatalogHelper;
	},

	getUrl(type) {
		let id = CatalogHelper.partnerId,
			allUrls = {
				full: 'xmlCatalogo.asp',
				color: 'xmlCor.asp',
				categories: 'xmlCategorias.asp'
			};

		return `${mainUrl}/${allUrls[type]}?IdResgateCampanha=${id}`;
	},

	parseObject(json) {
		return Promise.resolve(json.xml['rs:data'][0]['z:row']);
	},

	makeRequest(method, type) {
		let url = CatalogHelper.getUrl(type);
		return got[method](url)
			.then(CatalogHelper.requestSuccess)
			.catch(err => errorHandler('core', 'REQUEST_ERROR', err))
		;
	},

	requestSuccess(data) {
		return new Promise((resolve, reject) => {
			parser(data, (err, result) => {
				if(err) {
					return reject(err);
				}
				return resolve(result);
			});
		});
	}
};

module.exports = Object.create(CatalogHelper);
