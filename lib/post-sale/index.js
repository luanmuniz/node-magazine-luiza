'use strict';

const trackingHelper = require('./tracking-helper'),

PostSale = {
	tracking(options) {
		return trackingHelper.makeRequest(options);
	}
};

module.exports = Object.create(PostSale);
