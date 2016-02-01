'use strict';

const core = require('../core'),
	soap = require('../core/soap'),
	check = require('../core/check-helper'),

CheckoutHelper = {
	makeRequest(cart) {
		return CheckoutHelper.checkOptions(cart).then(() => {
			return soap.init(Object.assign({}, cart, {
				xmlBody: CheckoutHelper.getXmlBody(cart),
				endpoint: 'FinalizaPedido',
				responseTag: 'Pedidos',
				callback: CheckoutHelper.parseObject
			}));
		});
	},

	checkOptions(cart) {
		if(!check.hasSessionKey(cart.sessionKey)) {
			return core.errorHandler('order', 'MISSING_SESSION_KEY');
		}

		if(!cart.cpf) {
			return core.errorHandler('order', 'MISSING_CPF');
		}

		if(!cart.cep) {
			return core.errorHandler('order', 'MISSING_CEP');
		}

		if(!cart.address) {
			return core.errorHandler('order', 'MISSING_ADDRESS');
		}

		if(!core.is('object', cart.address)) {
			return core.errorHandler('core', 'ADDRESS_IS_NOT_AN_OBJECT');
		}

		if(!cart.address.street) {
			return core.errorHandler('order', 'MISSING_ADDRESS_STREET');
		}

		if(!cart.address.number) {
			return core.errorHandler('order', 'MISSING_ADDRESS_NUMBER');
		}

		if(!cart.address.district) {
			return core.errorHandler('order', 'MISSING_ADDRESS_DISTRICT');
		}

		if(!cart.address.city) {
			return core.errorHandler('order', 'MISSING_ADDRESS_CITY');
		}

		if(!cart.address.state) {
			return core.errorHandler('order', 'MISSING_ADDRESS_STATE');
		}

		if(!cart.name) {
			return core.errorHandler('order', 'MISSING_NAME');
		}

		if(core.isCnpj(cart.cpf) && !cart.stateRegistrantion) {
			return core.errorHandler('order', 'MISSING_STATE_REGISTRATION');
		}

		if(core.isCpf(cart.cpf) && cart.stateRegistration !== 'ISENTO') {
			return core.errorHandler('order', 'STATE_REGISTRATION_IS_NOT_ISENTO');
		}

		if(!cart.partnerOrderNumber) {
			return core.errorHandler('order', 'MISSING_PARTNER_ORDER_NUMBER');
		}

		return Promise.resolve(cart);
	},

	getXmlBody(cart) {
		return {
			Carrinho: {
				IdResgateCampanha: core.partnerId,
				Chave_sessao: cart.sessionKey,
				CPF: core.justNumbers(cart.cpf),
				CEP: core.justNumbers(cart.cep),
				Endereco: cart.address.street,
				Numero: cart.address.number,
				Complemento: cart.address.complement,
				Bairro: cart.address.district,
				Cidade: cart.address.city,
				Estado: cart.address.state,
				DDD: core.justNumbers(cart.phone.ddd),
				Telefone: core.justNumbers(cart.phone.number),
				Email: cart.email,
				Nome_Premiado: cart.name,
				Inscricao: cart.stateRegistration,
				PedidoParceiro: cart.partnerOrderNumber
			}
		};
	},

	parseObject(json) {
		if(+json.idStatus !== 0) {
			return core.responseError(json);
		}

		const products = core.toArray(json.ListaProdutos.Produto);

		return {
			address: {
				street: json.Endereco,
				number: json.Numero,
				complement: json.Complemento,
				district: json.Bairro,
				city: json.Cidade,
				state: json.Estado
			},
			phone: {
				ddd: json.DDD,
				number: json.Telefone
			},
			cep: json.CEP,
			cpf: json.CPF,
			sessionKey: json.Chave_sessao,
			email: json.Email,
			partnerId: json.IdResgateCampanha,
			message: json.Mensagem,
			orderNumber: json.Pedido,
			deliveryForecast: json.Previsao,
			quantityItems: Number(json.Quantidade_itens),
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
					stock: Number(product.Estoque),
					available: Boolean(Number(product.Liberado)),
					quantity: Number(product.Quantidade),
					valueCurrency: product.valor_moeda_produto,
					valueBrl: product.valor_reais_produto
				};
			})
		};
	}
};

module.exports = Object.create(CheckoutHelper);
