'use strict';

var core = require('../core'),
	soap = require('../core/soap'),

CheckoutHelper = {
	makeRequest(cart) {
		return soap.init(Object.assign({}, cart, {
			xmlBody: CheckoutHelper.getXmlBody(cart),
			endpoint: 'FinalizaPedido',
			responseTag: 'Pedidos',
			callback: CheckoutHelper.parseObject
		}));
	},

	getXmlBody(cart) {
		return {
			Carrinho: {
				IdResgateCampanha: core.partnerId,
				Chave_sessao: cart.sessionKey,
				CPF: cart.cpf,
				CEP: cart.cep,
				Endereco: cart.address.street,
				Numero: cart.address.number,
				Complemento: cart.address.complement,
				Bairro: cart.address.district,
				Cidade: cart.address.city,
				Estado: cart.address.state,
				DDD: cart.phone.ddd,
				Telefone: cart.phone.number,
				Email: cart.email,
				Nome_Premiado: cart.name,
				Inscricao: cart.stateRegistration,
				PedidoParceiro: cart.partnerOrderNumber
			}
		};
	},

	parseObject(json) {
		let products = json.ListaProdutos.Produto;
		products = !Array.isArray(products) ? [ products ] : products;
		return {
			district: json.Bairro,
			cep: json.CEP,
			cpf: json.CPF,
			sessionKey: json.Chave_sessao,
			city: json.Cidade,
			complement: json.Complemento,
			ddd: json.DDD,
			phone: json.Telefone,
			email: json.Email,
			address: json.Endereco,
			state: json.Estado,
			partnerId: json.IdResgateCampanha,
			message: json.Mensagem,
			number: json.Numero,
			orderNumber: json.Pedido,
			deliveryForecast: json.Previsao,
			quantityItems: json.Quantidade_itens,
			shippingValueBrl: json.Valor_Frete	,
			shippingValueCurrency: json.Valor_Frete_Moeda,
			valueCurrency: json.Valor_Moeda,
			valueBrl: json.Valor_Reais,
			orderTotalValueBrl: json.Valor_Tot_Produto,
			orderTotalValueCurrency: json.Valor_Tot_Produto_Moeda,
			status: json.idStatus,
			products: products.map(product => {
				return {
					id: product.Codigo,
					model: product.Modelo,
					stock: product.Estoque,
					available: Boolean(Number(product.Liberado)),
					quantity: product.Quantidade,
					valueCurrency: product.valor_moeda_produto,
					valueBrl: product.valor_reais_produto
				};
			})
		};
	}
};

module.exports = Object.create(CheckoutHelper);
