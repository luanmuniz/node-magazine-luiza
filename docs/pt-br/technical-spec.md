# Ficha técnica de produto

## Obtendo a Ficha Técnica

Primeiro é necessário instanciar o objeto `MagazineLuizaAPI`, passando o seu ID:

```
const magazineLuiza = new MagazineLuizaAPI('000');
```

Após isso, use o método `getTechnicalSpec()` em `catalog`, passando o `SKU` do produto (Código + Modelo) para obter o catálogo:

```js
magazineLuiza.catalog.getTechnicalSpec(sku);
```

Para pegar o Código e Modelo do produto, é necessário buscar primeiro o catálogo de produtos:

```js
const catalog = magazineLuiza.catalog;
catalog.getProducts()
	.then(data => catalog.getTechnicalSpec(data.id + data.model))
	.then(techSpec => console.log(techSpec));
```

Esse método retorna uma Promise. O resultado da Promise é um array de objetos. Cada objeto contém duas propriedades: `title` e `description`, para cada informação técnica, no formato:

```json
[
	"title": "Informações Técnicas",
	"description": "Descrição"
]
```

