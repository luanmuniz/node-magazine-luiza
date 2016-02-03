'use strict';

const fs = require('fs');
const path = require('path');
const MagazineLuizaAPI = require('../../index');
const PARTNER_ID = process.env.PARTNER_ID;
const magazineLuiza = new MagazineLuizaAPI(PARTNER_ID);
const productsPath = path.resolve('test', 'mock', 'json', 'products.json');
let productsFile = fs.existsSync(productsPath) ? readFile() : null;

function getProducts() {
	if(productsFile) {
		return Promise.resolve(productsFile);
	}

	console.log('START GET PRODUCTS');
	return magazineLuiza.catalog.getProducts()
		.then(products => {
			return new Promise((resolve, reject) => {
				fs.writeFile(productsPath, JSON.stringify(products), err => {
					if(err) reject(err);
					productsFile = readFile();
					resolve(productsFile);
				});
			});
		})
	;
}

function readFile() {
	return JSON.parse(fs.readFileSync(productsPath, 'utf8'));
}

module.exports = getProducts;
