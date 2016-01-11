# Catálogo de produtos

## Obtendo o catálogo de produtos

Primeiro é necessário instanciar o objeto `MagazineLuizaAPI`, passando o seu ID:

```
const magazineLuiza = new MagazineLuizaAPI('000');
```

Após isso, use o método `getProducts()` em `catalog` para obter o catálogo:

```
magazineLuiza.catalog.getProducts();
```

Esse método retorna uma Promise. O resultado da Promise é um array de objetos, com os produtos do catálogo, no formato:

```json
[
    {
        "action": "add",
        "active": true,
        "amountDetails": 1,
        "brand": "pontto lavabo",
        "category": "CJ",
        "changeDate": "2015-06-26T15:30:00.705391",
        "description": "Assento Sanit\u00e1rio Saveiro",
        "descriptionCategory": "Casa e Jardim",
        "descriptionSubcategory": "Assentos Sanit\u00e1rios",
        "hasMounting": false,
        "id": "2065448",
        "images": {
            "category": "http://i.mlcdn.com.br/210x210/206544800.jpg",
            "default": "http://i.mlcdn.com.br/210x210/206544800.jpg",
            "productDetail": "http://i.mlcdn.com.br/410x308/206544800.jpg",
            "productLarge": "http://i.mlcdn.com.br/1500x1500/206544800.jpg",
            "productPPI": "http://i.mlcdn.com.br/210x210/206544800.jpg",
            "showcase": "http://i.mlcdn.com.br/210x210/206544800.jpg",
            "showcaseLarge": "http://i.mlcdn.com.br/1500x1500/206544800.jpg"
        },
        "master": "2065448",
        "model": "00",
        "ncm": "",
        "price": "329.90",
        "reference": "para Lou\u00e7a Celite - Pontto Lavabo",
        "salePrice": "329.90",
        "subcategory": "CJSA",
        "voltage": 3
    },
    {
        "action": "add",
        "active": true,
        "amountDetails": 1,
        "brand": "arno",
        "category": "EP",
        "changeDate": "2015-06-26T15:30:00.705391",
        "description": "Cafeteira El\u00e9trica Arno Bevarage CAFP",
        "descriptionCategory": "Eletroport\u00e1teis",
        "descriptionSubcategory": "Cafeteiras El\u00e9tricas",
        "hasMounting": false,
        "id": "0235174",
        "images": {
            "category": "http://i.mlcdn.com.br/210x210/023517400.jpg",
            "default": "http://i.mlcdn.com.br/210x210/023517400.jpg",
            "productDetail": "http://i.mlcdn.com.br/410x308/023517400.jpg",
            "productLarge": "http://i.mlcdn.com.br/1500x1500/023517400.jpg",
            "productPPI": "http://i.mlcdn.com.br/210x210/023517400.jpg",
            "showcase": "http://i.mlcdn.com.br/210x210/023517400.jpg",
            "showcaseLarge": "http://i.mlcdn.com.br/1500x1500/023517400.jpg"
        },
        "master": "0235174",
        "model": "00",
        "ncm": "",
        "price": "79.00",
        "reference": "12 X\u00edcaras",
        "salePrice": "69.90",
        "subcategory": "CAFE",
        "voltage": 1
    },
    {
        "action": "add",
        "active": true,
        "amountDetails": 1,
        "brand": "arno",
        "category": "EP",
        "changeDate": "2015-06-26T15:30:00.705391",
        "description": "Cafeteira El\u00e9trica Arno Bevarage CAFP",
        "descriptionCategory": "Eletroport\u00e1teis",
        "descriptionSubcategory": "Cafeteiras El\u00e9tricas",
        "hasMounting": false,
        "id": "0235175",
        "images": {
            "category": "http://i.mlcdn.com.br/210x210/023517500.jpg",
            "default": "http://i.mlcdn.com.br/210x210/023517500.jpg",
            "productDetail": "http://i.mlcdn.com.br/410x308/023517500.jpg",
            "productLarge": "http://i.mlcdn.com.br/1500x1500/023517500.jpg",
            "productPPI": "http://i.mlcdn.com.br/210x210/023517500.jpg",
            "showcase": "http://i.mlcdn.com.br/210x210/023517500.jpg",
            "showcaseLarge": "http://i.mlcdn.com.br/1500x1500/023517500.jpg"
        },
        "master": "0235174",
        "model": "00",
        "ncm": "",
        "price": "79.00",
        "reference": "12 X\u00edcaras",
        "salePrice": "69.90",
        "subcategory": "CAFE",
        "voltage": 2
    },
    {
        "action": "add",
        "active": false,
        "amountDetails": 1,
        "brand": "suggar",
        "category": "ED",
        "changeDate": "2015-06-26T15:30:00.705391",
        "description": "Tanquinho Suggar Lavamax 10.0 10Kg",
        "descriptionCategory": "Eletrodom\u00e9sticos",
        "descriptionSubcategory": "Tanquinho",
        "hasMounting": false,
        "id": "0842805",
        "images": {
            "category": "http://i.mlcdn.com.br/210x210/084280500.jpg",
            "default": "http://i.mlcdn.com.br/210x210/084280500.jpg",
            "productDetail": "http://i.mlcdn.com.br/410x308/084280500.jpg",
            "productLarge": "http://i.mlcdn.com.br/1500x1500/084280500.jpg",
            "productPPI": "http://i.mlcdn.com.br/210x210/084280500.jpg",
            "showcase": "http://i.mlcdn.com.br/210x210/084280500.jpg",
            "showcaseLarge": "http://i.mlcdn.com.br/1500x1500/084280500.jpg"
        },
        "master": "0842805",
        "model": "00",
        "ncm": "",
        "price": "459.00",
        "reference": "Desligamento Autom\u00e1tico + 1 Sab\u00e3o em P\u00f3 Tixan Yp\u00ea",
        "salePrice": "379.00",
        "subcategory": "TANK",
        "voltage": 1
    }
]
```

## Tipos e referências de valores do objeto retornado com a API

```js
{
	action: <String> ACAO,
	active: <Boolean> ATIVO,
	category: <String> CATEGORIA,
	ncm: <String> CLASSIFICACAO_FISCAL,
	id: <String> CODIGO,
	changeDate: <Date String> DATA_ALTERACAO,
	description: <String> DESCRICAO,
	descriptionCategory: <String> DESC_CATEGORIA,
	descriptionSubcategory: <String> DESC_SUBCATEGORIA,
	images: {
		default: <String> IMAGEM,
		category: <String> IMAGEM_CATEGORIA,
		productDetail: <String> IMAGEM_PRODUTO_DETALHE,
		productLarge: <String> IMAGEM_PRODUTO_GRANDE,
		productPPI: <String> IMAGEM_PRODUTO_PPI,
		showcase: <String> IMAGEM_VITRINE,
		showcaseLarge: <String> IMAGEM_VITRINE_GRANDE
	},
	brand: <String> MARCA,
	master: <String> MESTRE,
	model: <String> MODELO,
	amountDetails: <Number> QTDE_DETALHES,
	reference: <String> REFERENCIA,
	subcategory: <String> SUBCATEGORIA,
	hasMounting: <String> TEM_MONTAGEM,
	price: <String> VALOR,
	salePrice: <String> VALOR_VENDA,
	voltage: <Number> VOLTAGEM
}
```
