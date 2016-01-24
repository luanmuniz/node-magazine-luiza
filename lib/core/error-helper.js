'use strict';

var ErrorHelper = {
	errorObj: {
		core: {
			REQUEST_ERROR: 'Request Error',
			FORBIDDEN: 'You need to pass your credentials to initialize the module',
			WRONG_URL: 'Wrong URL'
		},

		product: {
			MISSING_ID_MODEL: 'You must pass product ID and Model',
			NO_TECH_SPEC: 'No technical specifications for this product'
		},

		order: {
			MISSING_CEP: 'You must pass a valid CEP',
			MISSING_SESSION_KEY: 'You must pass a sessionKey',
			MISSING_CPF: 'You must pass the CPF or CNPJ',
			MISSING_PRODUCTS: 'You must pass the products',
			PRODUCTS_ARE_NOT_ARRAY: 'Products must be an array of items',
			PRODUCT_NOT_HAVE_AN_ID: 'Every product must have an ID',
			PRODUCT_NOT_HAVE_A_MODEL: 'Every product must have a model',
			PRODUCT_NOT_HAVE_QUANTITY: 'Every product must have quantity'
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
			returnedError.err = err;
		}

		return Promise.reject(returnedError);
	}
};

module.exports = Object.create(ErrorHelper);
