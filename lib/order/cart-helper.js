'use strict';

var soap = require('../core/soap'),

CartHelper = {
	calculateShipping(options) {
		return soap.init(Object.assign({}, options, {
			endpoint: 'CalculaFrete',
			internalTag: 'Carrinho',
			responseTag: 'Carrinho',
			callback: CartHelper.parseObject
		}));
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
