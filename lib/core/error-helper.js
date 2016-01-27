'use strict';

var ErrorHelper = {
	errorObj: {
		core: {
			REQUEST_ERROR: 'Request Error',
			FORBIDDEN: 'You need to pass your credentials to initialize the module',
			WRONG_URL: 'Wrong URL',
			ADDRESS_IS_NOT_AN_OBJECT: 'Address must be an object',
			API_ERROR: 'API Error'
		},

		product: {
			MISSING_ID_MODEL: 'You must pass product ID and Model',
			NO_TECH_SPEC: 'No technical specifications for this product'
		},

		order: {
			MISSING_SESSION_KEY: 'You must pass a sessionKey',
			MISSING_CPF: 'You must pass the CPF or CNPJ',
			MISSING_CEP: 'You must pass a valid CEP',
			MISSING_PRODUCTS: 'You must pass the products',
			PRODUCTS_ARE_NOT_ARRAY: 'Products must be an array of items',
			PRODUCT_NOT_HAVE_AN_ID: 'Every product must have an ID',
			PRODUCT_NOT_HAVE_A_MODEL: 'Every product must have a model',
			PRODUCT_NOT_HAVE_QUANTITY: 'Every product must have quantity',
			MISSING_ADDRESS: 'You must pass the address as an object',
			MISSING_ADDRESS_STREET: 'You must pass the address street',
			MISSING_ADDRESS_NUMBER: 'You must pass the address number',
			MISSING_ADDRESS_DISTRICT: 'You must pass the address district',
			MISSING_ADDRESS_CITY: 'You must pass the address city',
			MISSING_ADDRESS_STATE: 'You must pass the address state',
			MISSING_NAME: 'You must pass the buyer\'s name',
			MISSING_STATE_REGISTRATION: 'You must pass a State Registration',
			STATE_REGISTRATION_IS_NOT_ISENTO: 'You must pass State Registration as ISENTO',
			MISSING_PARTNER_ORDER_NUMBER: 'You must pass Partner Order Number'
		},

		tracking: {
			IT_IS_NOT_AN_OBJECT: 'You must pass an object with `cpf` and `orderNumber` properties',
			MISSING_ORDER_NUMBER: 'You must pass the orderNumber'
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
