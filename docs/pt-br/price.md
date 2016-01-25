# Preço

## Verificando o preço atualizado de um produto

Primeiro é necessário instanciar o objeto `MagazineLuizaAPI`, passando o seu ID:

```js
const magazineLuiza = new MagazineLuizaAPI('000');
```

Após isso, use o método `getPrice()` em `catalog`, passando o ID e o Modelo do produto:

```js
magazineLuiza.catalog.getPrice(id, model);
```

Para pegar o ID e Modelo do produto, é necessário buscar primeiro o catálogo de produtos, e então selecionar o produto que você quer ter o preço atualizado:

```js
const catalog = magazineLuiza.catalog;
catalog.getProducts()
	.then(products => {
		const product = products[0];
		return catalog.getPrice(product.id, product.model);
	})
	.then(price => console.log(price));
```

Esse método retorna uma Promise. O resultado da Promise é um objeto no formato:

```json
{
    "message": "Opera\u00e7\u00e3o realizada com sucesso",
    "partnerId": "123",
    "productId": "2116449",
    "productModel": "00",
    "status": "0",
    "valueBrl": "3219.08",
    "valueCurrency": "3219.08"
}
```

## Tipos e referências de valores do objeto retornado com a API

```js
{
	productId: <String> Codigo,
	productModel: <String> Modelo,
	valueBrl: <String> Valor_Reais,
	valueCurrency: <String> Valor_Moeda,
	partnerId: <String> IdResgateCampanha,
	status: <String> idStatus,
	message: <String> Mensagem
}
```
