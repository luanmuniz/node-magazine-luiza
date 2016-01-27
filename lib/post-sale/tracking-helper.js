'use strict';

const core = require('../core'),
	soap = require('../core/soap'),

TrackingHelper = {
	makeRequest(options) {
		return TrackingHelper.checkOptions(options).then(() => {
			return soap.init({
				xmlBody: TrackingHelper.getXmlBody(options),
				endpoint: 'TrackingFull',
				responseTag: 'Pedidos',
				callback: TrackingHelper.parseObject
			});
		});
	},

	checkOptions(options) {
		if(!core.is('object', options)) {
			return core.errorHandler('tracking', 'IT_IS_NOT_AN_OBJECT');
		}

		if(!options.cpf) {
			return core.errorHandler('order', 'MISSING_CPF');
		}

		if(!options.orderNumber) {
			return core.errorHandler('tracking', 'MISSING_ORDER_NUMBER');
		}

		return Promise.resolve();
	},

	getXmlBody(options) {
		return {
			CPF: core.justNumbers(options.cpf),
			Pedido: options.orderNumber
		};
	},

	parseObject(json) {
		if(+json.idStatus !== 0) {
			return core.errorHandler('core', 'API_ERROR', {
				status: json.idStatus,
				message: json.Mensagem
			});
		}

		const deliveryList = core.toArray(json.ListaEntrega.Entrega);

		return {
			cpf: json.CPF,
			partnerId: json.IdResgateCampanha,
			orderNumber: json.Pedido,
			partnerOrderNumber: json.PedidoParceiro,
			orderDate: json.DataPedido,
			deliveryForecast: json.EntregaPrevista,
			orderStatusId: json.PedidoStatusId,
			orderStatusDescription: json.PedidoStatusDesc,
			deliveryAddress: {
				street: json.EnderecoEntrega.Endereco,
				number: json.EnderecoEntrega.Numero,
				complement: json.EnderecoEntrega.Complemento,
				district: json.EnderecoEntrega.Bairro,
				city: json.EnderecoEntrega.Cidade,
				state: json.EnderecoEntrega.Estado,
				cep: json.EnderecoEntrega.CEP
			},
			status: json.idStatus,
			message: json.Mensagem,
			deliveryList: deliveryList.map(delivery => {
				const statusList = core.toArray(delivery.ListaStatus.Status),
					historyList = core.toArray(delivery.ListaHistorico.Historico),
					productsList = core.toArray(delivery.ListaProdutos.Produto);

				return {
					invoiceNumber: delivery.NotaFiscalNumero,
					invoiceKey: delivery.NotaFiscalChave,
					deliveryForecast: delivery.EntregaPrevista,
					trackingUrl: delivery.UrlRastreamento,
					statusList: statusList.map(status => {
						return {
							id: status.StatusId,
							date: status.DataStatus,
							description: status.DescStatus
						};
					}),
					historyList: historyList.map(history => {
						return {
							date: history.DataHistorico,
							description: history.DescHistorico
						};
					}),
					productsList: productsList.map(product => {
						return {
							id: product.ProdutoId,
							description: product.DescProduto
						};
					})
				};
			})
		};
	}
};

module.exports = Object.create(TrackingHelper);
