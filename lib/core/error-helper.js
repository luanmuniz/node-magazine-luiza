'use strict';

var ErrorHelper = {
	errorObj: {
		core: {
			REQUEST_ERROR: 'Request Error',
			FORBIDDEN: 'You need to pass your credentials to initialize the module'
		},

		product: {
			MISSING_ID: 'You must pass product id'
		}
	},

	errorHandler: (section, code, err) => {
		var returnedError = { success: false },
			message = 'Error Unknown';

		if(ErrorHelper.errorObj[section][code]) {
			message = ErrorHelper.errorObj[section][code];
		}

		returnedError.code = code;
		returnedError.message = message;

		if(err) {
			delete err.response;
			returnedError.err = err;
		}

		return Promise.reject(returnedError.message);
	}
};

module.exports = Object.create(ErrorHelper);
