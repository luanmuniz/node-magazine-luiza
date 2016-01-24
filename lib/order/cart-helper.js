'use strict';

var core = require('../core'),
	soap = require('../core/soap'),

CartHelper = {
	calculateShipping(options) {
		return CartHelper.checkOptions(options) ||
			soap.init(Object.assign({}, options, {
				xmlBody: CartHelper.getXmlBody(options),
				endpoint: 'CalculaFrete',
				responseTag: 'Carrinho',
				callback: CartHelper.parseObject
			}))
		;
	},

	checkOptions(options) {
		return false;
	},

	getXmlBody(options) {
		return {
			Carrinho: {
				IdResgateCampanha: core.partnerId,
				Chave_sessao: options.sessionKey,
				CPF: options.cpf,
				CEP: options.cep,
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
