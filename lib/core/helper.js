'use strict';

var errorAPI = {
	errorObj: {
		core: {
			REQUEST_ERROR: 'Request Error',
			FORBIDDEN: 'You need to pass your credentials to initialize the module'
		}
	},

	errorHandler: (section, code, err) => {
		var returnedError = { success: false },
			message = 'Error Unknown';

		if(errorAPI.errorObj[section][code]) {
			message = errorAPI.errorObj[section][code];
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

module.exports = Object.create(errorAPI);
