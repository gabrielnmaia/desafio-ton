# Desafio back-end Ton

## Requisitos
* NodeJS
* Docker
* Insominia ou outro API Client

## Instruções para rodar a aplicação
### - Clone o repositório para o seu computador.
### - Na raiz do projeto execute os comandos a seguir:<br />

* Unix
 ```
yarn
make up
yarn dev
```
* Windows
 ```
yarn
docker-compose up -d
yarn dev
```
### - A aplicação possui 3 endpoints:
* GET transaction: retorna as transações do cliente.
* POST transaction: processa a transação do cliente, o método necessita de um body no formato abaixo.
 ```
{
  "value": 100,
  "description": "teste",
  "method": "credit_card",
  "card_number": "1234567891911",
  "card_name": "Gabriel",
  "card_valid": "11/22",
  "card_cvv": "927"
}
```
* GET balance: retorno os saldos do cliente.

## Instruções para executar os testes
### Execute o comando a seguir:<br />

 ```
yarn test
```

## Após o uso da aplicação execute os comandos a seguir:<br />

* Unix
 ```
make down
```
* Windows
 ```
docker-compose down
```
