# Catálogo de Categorias e subcategorias dos produtos

## Obtendo o catálogo de categorias

Primeiro é necessário instanciar o objeto `MagazineLuizaAPI`, passando o seu ID:

```js
const magazineLuiza = new MagazineLuizaAPI('000');
```

Após isso, use o método `getCategories()` em `catalog` para obter o catálogo:

```js
magazineLuiza.catalog.getCategories();
```

Esse método retorna uma Promise. O resultado da Promise é um array de objetos, com as categorias e subcategorias dos produtos do catálogo, no formato:

```json
[
    {
        "categoryDescription": "Acess\u00f3rios para Beb\u00ea",
        "categoryID": "AB",
        "subcategoryDescription": "Bico de mamadeira",
        "subcategoryID": "ABBM"
    }
]
```

## Tipos e referências de valores do objeto retornado com a API

```js
{
	categoryID: <String> strLinha,
	categoryDescription: <String> Descricaolinha,
	subcategoryID: <String> strSetor,
	subcategoryDescription: <String>category.strDescricao
}
```

