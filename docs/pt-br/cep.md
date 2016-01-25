# CEP de entrega

## Consulta disponibilidade de entrega para determinado CEP

Primeiro é necessário instanciar o objeto `MagazineLuizaAPI`, passando o seu ID:

```js
const magazineLuiza = new MagazineLuizaAPI('000');
```

Após isso, use o método `checkCep()` em `order`, passando o CEP a ser consultado:

```js
magazineLuiza.order.checkCep(cep);
```

O CEP pode ser passado em qualquer formato, desde que tenha os 8 caracteres necessários para a consulta:

```js
magazineluiza.order.checkCep('04328030').then(response => {
	console.log(response);
});
```

Esse método retorna uma Promise. O resultado da Promise é um objeto no formato:

```json
{
    "cep": "04328030",
    "message": "Cep encontrado na base de dados.",
    "parnterId": "0000",
    "status": "0"
}
```

## Tipos e referências de valores do objeto retornado com a API

```js
{
	cep: <String> CEP,
	parnterId: <String> IdResgateCampanha,
	status: <String> idStatus,
	message: <String> Mensagem
}
```
