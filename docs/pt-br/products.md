# Catálogo de produtos

## Obtendo o catálogo de produtos

Primeiro é necessário instanciar o objeto `MagazineLuizaAPI`, passando o seu ID:

```js
const magazineLuiza = new MagazineLuizaAPI('000');
```

Após isso, use o método `getProducts()` em `catalog` para obter o catálogo:

```js
magazineLuiza.catalog.getProducts();
```

Esse método retorna uma Promise. O resultado da Promise é um array de objetos, com os produtos do catálogo, no formato:

```json
[
    {
        "action": "add",
        "active": true,
		"amountImageDetails": 1,
        "brand": "pontto lavabo",
        "category": "CJ",
        "changeDate": "2015-06-26T15:30:00.705391",
        "description": "Assento Sanit\u00e1rio Saveiro",
        "descriptionCategory": "Casa e Jardim",
        "descriptionSubcategory": "Assentos Sanit\u00e1rios",
        "id": "2065448",
        "images": {
            "category": {
                "details": [
                    "http://i.mlcdn.com.br/210x210/206544800a.jpg"
                ],
                "main": "http://i.mlcdn.com.br/210x210/206544800.jpg"
            },
            "default": {
                "details": [
                    "http://i.mlcdn.com.br/210x210/206544800a.jpg"
                ],
                "main": "http://i.mlcdn.com.br/210x210/206544800.jpg"
            },
            "productDetail": {
                "details": [
                    "http://i.mlcdn.com.br/410x308/206544800a.jpg"
                ],
                "main": "http://i.mlcdn.com.br/410x308/206544800.jpg"
            },
            "productLarge": {
                "details": [
                    "http://i.mlcdn.com.br/1500x1500/206544800a.jpg"
                ],
                "main": "http://i.mlcdn.com.br/1500x1500/206544800.jpg"
            },
            "productPPI": {
                "details": [
                    "http://i.mlcdn.com.br/210x210/206544800a.jpg"
                ],
                "main": "http://i.mlcdn.com.br/210x210/206544800.jpg"
            },
            "showcase": {
                "details": [
                    "http://i.mlcdn.com.br/210x210/206544800a.jpg"
                ],
                "main": "http://i.mlcdn.com.br/210x210/206544800.jpg"
            },
            "showcaseLarge": {
                "details": [
                    "http://i.mlcdn.com.br/1500x1500/206544800a.jpg"
                ],
                "main": "http://i.mlcdn.com.br/1500x1500/206544800.jpg"
            }
        },
        "master": "2065448",
        "model": "00",
        "ncm": "",
        "needsMount": false,
        "price": "329.90",
        "reference": "para Lou\u00e7a Celite - Pontto Lavabo",
        "salePrice": "329.90",
        "subcategory": "CJSA",
        "voltage": {
			"code": 3,
			"description": "Does not use electricity"
		}
    }
]
```

## Tipos e referências de valores do objeto retornado com a API

As imagens estão no objeto `images`, e estão separadas em outros dois objetos: `main` e `details`, onde `main` é a imagem principal, e, em `details`, está um array com as imagens de detalhes do produto:

```js
{
	action: <String> ACAO,
	active: <Boolean> ATIVO,
	amountImageDetails: <Number> QTDE_DETALHES,
	category: <String> CATEGORIA,
	ncm: <String> CLASSIFICACAO_FISCAL,
	id: <String> CODIGO,
	changeDate: <Date String> DATA_ALTERACAO,
	description: <String> DESCRICAO,
	descriptionCategory: <String> DESC_CATEGORIA,
	descriptionSubcategory: <String> DESC_SUBCATEGORIA,
	images: {
		category: {
			details: <Array> [ IMAGEM_CATEGORIA ],
			main: <String> IMAGEM_CATEGORIA
		},
		default: {
			details: <Array> [ IMAGEM ],
			main: <String> IMAGEM
		},
		productDetail: {
			details: <Array> [ IMAGEM_PRODUTO_DETALHE ],
			main: <String> IMAGEM_PRODUTO_DETALHE
		},
		productLarge: {
			details: <Array> [ IMAGEM_PRODUTO_GRANDE ],
			main: <String> IMAGEM_PRODUTO_GRANDE
		},
		productPPI: {
			details: <Array> [ IMAGEM_PRODUTO_PPI ],
			main: <String> IMAGEM_PRODUTO_PPI
		},
		showcase: {
			details: <Array> [ IMAGEM_VITRINE ],
			main: <String> IMAGEM_VITRINE
		},
		showcaseLarge: {
			details: <Array> [ IMAGEM_VITRINE_GRANDE ],
			main: <String> IMAGEM_VITRINE_GRANDE
		}
	},
	brand: <String> MARCA,
	master: <String> MESTRE,
	model: <String> MODELO,
	reference: <String> REFERENCIA,
	subcategory: <String> SUBCATEGORIA,
	needsMount: <String> TEM_MONTAGEM,
	price: <String> VALOR,
	salePrice: <String> VALOR_VENDA,
	voltage: {
		code: <Number> VOLTAGEM,
		description: <String>
	}
}
```
