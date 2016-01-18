'use strict';

var ErrorHelper = {
	errorObj: {
		core: {
			REQUEST_ERROR: 'Request Error',
			FORBIDDEN: 'You need to pass your credentials to initialize the module',
			WRONG_URL: 'Wrong URL'
		},

		product: {
			MISSING_ID_MODEL: 'You must pass product ID and Model'
		}
	},

	errorHandler: (section, code, err) => {
		var returnedError = { success: false },
			message = 'Unknown Error';

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
