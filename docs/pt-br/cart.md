# Carrinho / Simulação de Frete

Primeiro é necessário instanciar o objeto `MagazineLuizaAPI`, passando o seu ID:

```js
const magazineLuiza = new MagazineLuizaAPI('000');
```

## Consultar frete de um novo carrinho

Após isso, use o método `calculateShipping()` em `order`, passando os dados do carrinho que será criado:

```js
magazineLuiza.order.calculateShipping(cart);
```

O objeto `cart` deve ter as seguintes informações:

```js
const cart = {
	sessionKey: 0,
	cpf: '911.850.433-73',
	cep: '17120-000',
	products: [{
		id: '2083101',
		model: '00',
		quantity: 1
	},{
		id: '0235175',
		model: '00',
		quantity: 1
	}]
};
```

`sessionKey` deve ser `0` quando estiver criando um novo carrinho. Em CPF, deve ser passado `11` dígitos para o CPF e, se for um CNPJ, deve-se passar os `14` digítos correspondentes. Não há problemas em passar caracteres especiais, desde que tenha os `11` ou `14` dígitos.

`products` deve ser um array de produtos. Cada produto deve ser um objeto com `id`, `model` e `quantity`.

## Consultar frete para um carrinho existente

Utilize os mesmos campos do objeto `cart` acima, mas passe `sessionKey` com a chave do carrinho a ser consultado.

Esse método retorna uma Promise. O resultado da Promise é um objeto no formato:

```json
{
    "cep": "17120000",
    "cpf": "91185043373",
    "deliveryDate": "",
    "deliveryTime": "0",
    "message": "Existe(m) produto(s) do carrinho que est\u00e1 (\u00e3o) sem estoque",
    "partnerId": "0000",
    "products": [
        {
            "available": false,
            "id": "2083101",
            "model": "00",
            "quantity": "1",
            "stock": "1"
        },
        {
            "available": false,
            "id": "0235175",
            "model": "00",
            "quantity": "1",
            "stock": "1"
        }
    ],
    "sessionKey": "1861737",
    "shippingValueBrl": "0",
    "shippingValueCurrency": "0",
    "status": "1"
}
```

## Tipos e referências de valores do objeto retornado com a API

```js
{
	sessionKey: <String | Number> Chave_sessao,
	cpf: <String> CPF,
	partnerId: <String> IdResgateCampanha,
	cep: <String> CEP,
	shippingValueBrl: <String> Valor_Frete,
	shippingValueCurrency: <String> Valor_Frete_Moeda,
	deliveryTime: <String> Prazo,
	deliveryDate: <String> Data_Entrega,
	status: <String> idStatus,
	message: <String> Mensagem,
	products: [
		{
			id: <String> Codigo,
			model: <String> Modelo,
			quantity: <Number> Quantidade,
			available: <Boolean> Liberado,
			stock: <Number> Estoque
		}
	]
}
```
