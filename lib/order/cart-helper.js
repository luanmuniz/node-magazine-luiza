'use strict';

const core = require('../core'),
	soap = require('../core/soap'),
	check = require('../core/check-helper'),

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
		const products = options.products;
		if(!check.hasSessionKey(options.sessionKey)) {
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

		if(!check.allProductsHaveAnId(products)) {
			return core.errorHandler('order', 'PRODUCT_NOT_HAVE_AN_ID');
		}

		if(!check.allProductsHaveAModel(products)) {
			return core.errorHandler('order', 'PRODUCT_NOT_HAVE_A_MODEL');
		}

		if(!check.allProductsHaveQuantity(products)) {
			return core.errorHandler('order', 'PRODUCT_NOT_HAVE_QUANTITY');
		}

		return Promise.resolve();
	},

	getXmlBody(options) {
		return {
			Carrinho: {
				IdResgateCampanha: core.partnerId,
				Chave_sessao: options.sessionKey,
				CPF: core.justNumbers(options.cpf),
				CEP: core.justNumbers(options.cep),
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
					quantity: Number(product.Quantidade),
					available: Boolean(Number(product.Liberado)),
					stock: Number(product.Estoque)
				};
			})
		};
	}
};

module.exports = Object.create(CartHelper);
