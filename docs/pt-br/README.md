# Documentação API Magazine Luiza

## Introdução

Este modulo é uma abstração da API do Magazine Luiza para clientes B2B. Para utilizar esta API é necessário entrar em contato com a equipe do Magazine Luiza e firmar acordos comerciais. Então antes de continuar, tenha certeza que você tem todas as permissões e chaves de acesso.

## Esclarecimentos

Este modulo não é oficial, isso significa que não foi criado pela equipe do Magazine Luiza e sim por um parceiro terceiro. Caso você precise de algum suporte ou orientação para usar este módulo, por favor, crie [uma issue](issues/new) neste repositório e **NÃO** entre em contato com o suporte técnico do Magazine Luiza.

Este modulo não contém nenhuma informação privilegiada, sendo somente uma abstração da API Publica para os parceiros B2B. Se você trabalha dentro do Magazine Luiza e ficou preocupado com o conteúdo deste projeto, desde já esclareço que não existe nenhum dado de natureza privada e ou interna. Caso você precise de algum esclarecimento de qualquer natureza, você pode entrar em contato criando uma issue [clicando aqui](issues/new) ou através do email <suporte@zimp.me>

## Construtor

### Assinatura

```js
new MagazineLuizaAPI(id[, env])
```

Onde `id` é o seu ID de acesso à API, e `env` é o ambiente que você deseja testar.

`id` é obrigatório.

`env` é opcional. O valor padrão é `production`.

Você tem a opção de entrar com o valor `development`, para utilizar a API de homologação.
