# Atualizar pedido (Aprovação)

Primeiro é necessário instanciar o objeto `MagazineLuizaAPI`, passando o seu ID:

```js
const magazineLuiza = new MagazineLuizaAPI('000');
```

Após isso, use o método `update()` em `order`, passando os dados da compra:

```js
magazineLuiza.order.update(order);
```

Esse método deve ser usado somente após o checkout.

O objeto `order` deve ter as seguintes informações:

```js
const order = {
	cpf: '01010101078',
	orderNumber: '20136154',
	approved: true
};
```

Deve ser passado o CPF ou CNPJ do comprador, o número do pedido (recebido do método `checkout()`) e se o pedido deve ser aprovado (`approved: true`) ou rejeitado (`approved: false`).

Esse método retorna uma Promise. O resultado da Promise é um objeto no formato:

```json
{
    "cpf": "01010101078",
    "message": "Opera\u00e7\u00e3o realizada com sucesso",
    "orderNumber": "20136154",
    "partnerId": "0000",
    "status": "0"
}
```

## Tipos e referências de valores do objeto retornado com a API

```js
{
	cpf: <String> CPF,
	partnerId: <String> IdResgateCampanha,
	orderNumber: <String> Pedido,
	status: <String> idStatus,
	message: <String> Mensagem
}
```
