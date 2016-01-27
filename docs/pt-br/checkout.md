# Pedido (Checkout)

## Efetuar o checkout de um carrinho

Primeiro é necessário instanciar o objeto `MagazineLuizaAPI`, passando o seu ID:

```js
const magazineLuiza = new MagazineLuizaAPI('000');
```

Após isso, use o método `checkout()` em `order`, passando os dados da compra:

```js
magazineLuiza.order.checkout(order);
```

Esse método deve ser usado somente após a simulação do frete, com o carrinho já criado.

O objeto `order` deve ter as seguintes informações:

```js
{
	sessionKey: '0000000',
	cpf: '91185043373',
	cep: '17120000',
	address: {
		street: 'Rua Miguel Mentem',
		number: '100',
		complement: 'Sala 2',
		district: 'Vila Guilherme',
		city: 'São Paulo',
		state: 'SP',
		referency: 'Próximo à algum lugar'
	},
	phone: {
		ddd: '11',
		number: '999991234'
	},
	name: 'Maria Antonieta Silva',
	email: 'email@premiado.com',
	stateRegistration: 'ISENTO',
	partnerOrderNumber: '1188856'
};
```

`sessionKey` deve ser a chave recebida do método `calculateShipping()`. Em CPF, deve ser passado `11` dígitos para o CPF e, se for um CNPJ, deve-se passar os `14` digítos correspondentes. Não há problemas em passar caracteres especiais, desde que tenha os `11` ou `14` dígitos.

`sessionKey`, `cpf` e `cep` vêm do retorno do método `calculateShipping()`. O parâmetro `stateRegistration` deve ser passado como `ISENTO` se um CPF for utilizado no campo `cpf`. Caso o campo `cpf` receba um CNPJ, o número da Inscrição Estadual deve ser passado em `stateRegistration`.

Esse método retorna uma Promise. O resultado da Promise é um objeto no formato:

```json
{
    "address": "Rua Miguel Mentem",
    "cep": "02050010",
    "city": "S\u00e3o Paulo",
    "complement": "Sala 2",
    "cpf": "01010101078",
    "ddd": "11",
    "deliveryForecast": "07/10/2015 00:00:00",
    "district": "Vila Guilherme",
    "email": "email@premiado.com",
    "message": "Opera\u00e7\u00e3o realizada com sucesso",
    "number": "100",
    "orderNumber": "20656901",
    "orderTotalValueBrl": "29.90",
    "orderTotalValueCurrency": "29.90",
    "partnerId": "000",
    "phone": "999991234",
    "products": [
        {
            "available": true,
            "id": "2033019",
            "model": "00",
            "quantity": "1",
            "stock": "1",
            "valueBrl": "29.90",
            "valueCurrency": "29.90"
        }
    ],
    "quantityItems": "1",
    "sessionKey": "1188856",
    "shippingValueBrl": "5.15",
    "shippingValueCurrency": "5.15",
    "state": "SP",
    "status": "0",
    "valueBrl": "35.05",
    "valueCurrency": "35.05"
}
```

## Tipos e referências de valores do objeto retornado com a API

```js
{
	district: <String> Bairro,
	cep: <String> CEP,
	cpf: <String> CPF,
	sessionKey: <String> Chave_sessao,
	city: <String> Cidade,
	complement: <String> Complemento,
	ddd: <String> DDD,
	phone: <String> Telefone,
	email: <String> Email,
	address: <String> Endereco,
	state: <String> Estado,
	partnerId: <String> IdResgateCampanha,
	message: <String> Mensagem,
	number: <String> Numero,
	orderNumber: <String> Pedido,
	deliveryForecast: <String> Previsao,
	quantityItems: <Number> Quantidade_itens,
	shippingValueBrl: <String> Valor_Frete	,
	shippingValueCurrency: <String> Valor_Frete_Moeda,
	valueCurrency: <String> Valor_Moeda,
	valueBrl: <String> Valor_Reais,
	orderTotalValueBrl: <String> Valor_Tot_Produto,
	orderTotalValueCurrency: <String> Valor_Tot_Produto_Moeda,
	status: <String> idStatus,
	products: <Array> ListaProdutos.Produto [
		{
			id: <String> Codigo,
			model: <String> Modelo,
			stock: <Number> Estoque,
			available: <Boolean> Liberado,
			quantity: <Number> Quantidade,
			valueCurrency: <String> valor_moeda_produto,
			valueBrl: <String> valor_reais_produto
		}
	]
}
```
