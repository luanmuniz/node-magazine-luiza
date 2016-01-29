'use strict';

const core = require('../core'),

CatalogHelper = {
	parseObject(productNode) {
		const products = core.getMainNodeInfo(productNode, product => {
			return {
				action: product.ACAO,
				active: product.ATIVO,
				category: core.toUtf8(product.CATEGORIA),
				ncm: product.CLASSIFICACAO_FISCAL,
				id: product.CODIGO,
				changeDate: product.DATA_ALTERACAO,
				description: core.toUtf8(product.DESCRICAO),
				descriptionCategory: core.toUtf8(product.DESC_CATEGORIA),
				descriptionSubcategory: core.toUtf8(product.DESC_SUBCATEGORIA),
				images: CatalogHelper.getImageDetails({
					default: product.IMAGEM,
					category: product.IMAGEM_CATEGORIA,
					productDetail: product.IMAGEM_PRODUTO_DETALHE,
					productLarge: product.IMAGEM_PRODUTO_GRANDE,
					productPPI: product.IMAGEM_PRODUTO_PPI,
					showcase: product.IMAGEM_VITRINE,
					showcaseLarge: product.IMAGEM_VITRINE_GRANDE,
					amountDetails: +product.QTDE_DETALHES
				}),
				brand: core.toUtf8(product.MARCA),
				master: product.MESTRE,
				model: product.MODELO,
				reference: core.toUtf8(product.REFERENCIA),
				subcategory: core.toUtf8(product.SUBCATEGORIA),
				needsMount: core.stringNumberToBoolean(product.TEM_MONTAGEM),
				price: product.VALOR,
				salePrice: product.VALOR_VENDA,
				voltage: +product.VOLTAGEM
			};
		});

		return Promise.resolve(products);
	},

	getImageDetails(images) {
		const letters = 'abcdefghijklmnopqrstuvwxyz',
			imagesKeys = Object.keys(images)
			.filter(key => key !== 'amountDetails');

		return imagesKeys.reduce((object, key) => {
			const imagesArray = core.newArray(images.amountDetails);
			object[key] = {
				main: images[key],
				details: imagesArray.map((_, index) => {
					return images[key].replace(/(\.\w+)$/, `${letters[index]}$1`);
				})
			};
			return object;
		}, {});
	}
};

module.exports = Object.create(CatalogHelper);
