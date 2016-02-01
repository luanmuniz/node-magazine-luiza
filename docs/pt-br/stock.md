# Estoque

## Verificando se existe algum produto em estoque

Primeiro é necessário instanciar o objeto `MagazineLuizaAPI`, passando o seu ID:

```js
const magazineLuiza = new MagazineLuizaAPI('000');
```

Após isso, use o método `getStock()` em `catalog`, passando o ID, o Modelo e a quantidade do produto. A quantidade não é obrigatória. Se não for passado, a API assume como 1:

```js
magazineLuiza.catalog.getStock(id, model, quantity);
```

Para pegar o ID e Modelo do produto, é necessário buscar primeiro o catálogo de produtos, e então selecionar o produto que você quer consultar no estoque:

```js
const catalog = magazineLuiza.catalog;
catalog.getProducts()
	.then(products => {
		const product = products[0];
		return catalog.getStock(product.id, product.model);
	})
	.then(stock => console.log(stock));
```

Esse método retorna uma Promise. O resultado da Promise é o objeto no formato:

```json
{
    "available": false,
    "message": "Produto e/ou Modelo Inexistente",
    "needsMount": false,
    "partnerId": "0000",
    "productId": "0000000",
    "productModel": "00",
    "productQuantity": 1,
    "status": "3"
}
```

## Tipos e referências de valores do objeto retornado com a API

```js
{
	productId: <String> Codigo,
	productModel: <String> Modelo,
	productQuantity: <Number> Quantidade,
	partnerId: <String> IdResgateCampanha,
	available: <Boolean> Liberado,
	status: <String> idStatus,
	message: <String> Mensagem,
	needsMount: <Boolean> tem_montagem
}
```
