'use strict';

let got = require('got');
let fs = require('fs');
let path = require('path');
let xmlMockPath = ['.', 'test', 'mock', 'xml'];
let xmls = {
	xmlCatalogo: path.resolve.apply(path, xmlMockPath.concat('catalog.xml')),
	xmlCor: path.resolve.apply(path, xmlMockPath.concat('color.xml'))
};

got.get = (url) => {
	let chosenXml = url.split(/\/(\w+).asp/gi)[1];
	if(!chosenXml) {
		return Promise.reject(new Error('Wrong URL'));
	}
	let xml = fs.readFileSync(xmls[chosenXml], 'utf8');
	return Promise.resolve(xml);
};

module.exports = got;
