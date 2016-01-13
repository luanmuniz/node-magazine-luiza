# Ficha técnica de produto

## Obtendo a Ficha Técnica

Primeiro é necessário instanciar o objeto `MagazineLuizaAPI`, passando o seu ID:

```js
const magazineLuiza = new MagazineLuizaAPI('000');
```

Após isso, use o método `getTechnicalSpec()` em `catalog`, passando o ID e o Modelo do produto:

```js
magazineLuiza.catalog.getTechnicalSpec(product.id, product.model);
```

Para pegar o ID e Modelo do produto, é necessário buscar primeiro o catálogo de produtos, e então selecionar o produto que você quer as ficha técnica:

```js
const catalog = magazineLuiza.catalog;
catalog.getProducts()
	.then(products => {
		const product = products[0];
		return catalog.getTechnicalSpec(product.id, product.model);
	})
	.then(techSpec => console.log(techSpec));
```

Ou então, para pegar a ficha técnica de todos os produtos:

```js
const catalog = magazineluiza.catalog;
catalog.getProducts()
	.then(products => {
		const allProducts = products.map(product => {
			return catalog.getTechnicalSpec(product.id, product.model);
		});

		return Promise.all(allProducts);
	})
	.then(techSpec => console.log(techSpec));
```

Esse método retorna uma Promise. O resultado da Promise é um array de objetos. Cada objeto contém duas propriedades: `title` e `description`, para cada informação técnica, no formato:

```json
[
	{
		"productID": "1234",
		"productModel": "00",
		"title": "Informações Técnicas",
		"description": "Descrição"
	}
]
```

