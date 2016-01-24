'use strict';

let got = require('got');
let fs = require('fs');
let path = require('path');
let xmlMockPath = ['.', 'test', 'mock', 'xml'];
let htmlMockPath = ['.', 'test', 'mock', 'html'];
let xmls = {
	xmlCatalogo: path.resolve.apply(path, xmlMockPath.concat('catalog.xml')),
	xmlCor: path.resolve.apply(path, xmlMockPath.concat('color.xml')),
	xmlCategorias: path.resolve.apply(path, xmlMockPath.concat('category.xml')),
	FichaTecnicaCorp: path.resolve.apply(
		path,
		htmlMockPath.concat('technical-spec.html')
	),

	ConsultaProduto: path.resolve.apply(path, xmlMockPath.concat('stock.xml')),
	ConsultaPrecoProduto: path.resolve.apply(
		path,
		xmlMockPath.concat('price.xml')
	),
	ConsultaCEP: path.resolve.apply(path, xmlMockPath.concat('cep.xml')),
	CalculaFrete: path.resolve.apply(path, xmlMockPath.concat('shipping.xml')),
	FinalizaPedido: path.resolve.apply(path, xmlMockPath.concat('checkout.xml')),
	AprovaPedido: path.resolve.apply(path, xmlMockPath.concat('approve.xml'))
};

got.get = (url, options) => {
	let chosenXml = url.split(/\/(\w+).asp/gi)[1];
	if(!chosenXml) {
		return Promise.reject(new Error('Wrong URL'));
	}
	let xml = fs.readFileSync(xmls[chosenXml], 'utf8');
	return Promise.resolve({ body: xml });
};

got.post = (url, options) => {
	let chosenXml = options.headers.SOAPAction.split(/org\/(\w+)/gi)[1];
	if(!chosenXml) {
		return Promise.reject(new Error('Error post. Pass a SOAP Action'));
	}
	let xml = fs.readFileSync(xmls[chosenXml], 'utf8');
	return Promise.resolve({ body: xml });
};

module.exports = got;
