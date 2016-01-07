'use strict';

var got = require('got'),
	parser = require('xml2js').parseString,
	config = require('../../app').config,

CatalogHelper = {
	init(mainUrl, partnerId) {
		CatalogHelper.mainUrl = mainUrl;
		CatalogHelper.partnerId = partnerId;
		return CatalogHelper;
	},

	getUrl(type) {
		let mainUrl = CatalogHelper.mainUrl,
			id = CatalogHelper.partnerId,
			allUrls = {
				full: 'xmlCatalogo.asp',
				color: 'xmlCor.asp',
				categories: 'xmlCategorias.asp'
			};

		return `${mainUrl}/${allUrls[type]}?IdResgateCampanha=${id}`;
	},

	parseObject(json) {
		// products
		return Promise.resolve(json.xml['rs:data'][0]['z:row']);
	},

	makeRequest(type) {
		let url = CatalogHelper.getUrl(type);
		return got.get(url).then(CatalogHelper.requestSuccess);
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
