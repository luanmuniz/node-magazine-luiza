'use strict';

var NODE_ENV = process.env.NODE_ENV || 'development',
	configFile = require('./config/config.json')[NODE_ENV],

App = {
	config: configFile
};

module.exports = Object.create(App);
