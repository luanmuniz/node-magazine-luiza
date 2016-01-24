'use strict';

var core = require('../core'),
	soap = require('../core/soap'),

CartHelper = {
	calculateShipping(options) {
		return CartHelper.checkOptions(options).then(() => {
			return soap.init(Object.assign({}, options, {
				xmlBody: CartHelper.getXmlBody(options),
				endpoint: 'CalculaFrete',
				responseTag: 'Carrinho',
				callback: CartHelper.parseObject
			}));
		});
	},

	checkOptions(options) {
		if(options.sessionKey === undefined) {
			return core.errorHandler('order', 'MISSING_SESSION_KEY');
		}

		if(!options.cpf) {
			return core.errorHandler('order', 'MISSING_CPF');
		}

		if(!options.cep) {
			return core.errorHandler('order', 'MISSING_CEP');
		}

		if(!options.products) {
			return core.errorHandler('order', 'MISSING_PRODUCTS');
		}

		if(!Array.isArray(options.products)) {
			return core.errorHandler('order', 'PRODUCTS_ARE_NOT_ARRAY');
		}

		let products = options.products;
		if(!CartHelper.allProductsHaveAnId(products)) {
			return core.errorHandler('order', 'PRODUCT_NOT_HAVE_AN_ID');
		}

		if(!CartHelper.allProductsHaveAModel(products)) {
			return core.errorHandler('order', 'PRODUCT_NOT_HAVE_A_MODEL');
		}

		if(!CartHelper.allProductsHaveQuantity(products)) {
			return core.errorHandler('order', 'PRODUCT_NOT_HAVE_QUANTITY');
		}

		return Promise.resolve();
	},

	allProductsHaveAnId(products) {
		return !products.some(product => !product.id);
	},

	allProductsHaveAModel(products) {
		return !products.some(product => !product.model);
	},

	allProductsHaveQuantity(products) {
		return !products.some(product => !product.quantity);
	},

	getXmlBody(options) {
		return {
			Carrinho: {
				IdResgateCampanha: core.partnerId,
				Chave_sessao: options.sessionKey,
				CPF: options.cpf.replace(/\D/g, ''),
				CEP: options.cep.replace(/\D/g, ''),
				ListaProdutos: {
					Produto: options.products.map(item => {
						return {
							Codigo: item.id,
							Modelo: item.model,
							Quantidade: item.quantity
						};
					})
				}
			}
		};
	},

	parseObject(cart) {
		return {
			sessionKey: cart.Chave_sessao,
			cpf: cart.CPF,
			partnerId: cart.IdResgateCampanha,
			cep: cart.CEP,
			shippingValueBrl: cart.Valor_Frete,
			shippingValueCurrency: cart.Valor_Frete_Moeda,
			deliveryTime: cart.Prazo,
			deliveryDate: cart.Data_Entrega,
			status: cart.idStatus,
			message: cart.Mensagem,
			products: cart.ListaProdutos.Produto.map(product => {
				return {
					id: product.Codigo,
					model: product.Modelo,
					quantity: product.Quantidade,
					available: Boolean(Number(product.Liberado)),
					stock: product.Estoque
				};
			})
		};
	}
};

module.exports = Object.create(CartHelper);
