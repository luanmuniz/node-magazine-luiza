'use strict';

let got = require('got');
let fs = require('fs');
let path = require('path');
let xmls = {
	xmlCatalogo: path.resolve('.', 'test', 'mock', 'xml', 'catalog.xml')
};

got.get = (url) => {
	let chosenXml = url.split(/\/(\w+).asp/gi)[1];
	let xml = fs.readFileSync(xmls[chosenXml], 'utf8');
	return Promise.resolve(xml);
};

module.exports = got;
