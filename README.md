# ntconsult-challenge

## Iniciando projeto pelo docker

### Pré-requisitos
- Docker deve estar instalado na máquina.

### Passos para iniciar o projeto:
1. Execute o comando abaixo para construir e iniciar o projeto:

```
docker-compose up --build
```

2. Aguarde até que o processo esteja completo. O contêiner será construído e o projeto iniciará automaticamente após a construção.
3. Acesse a aplicação através da URL: [http://localhost:8080/](http://localhost:8080/).

## Rodando Testes com Docker

### Executando testes dentro do contêiner Docker:
1. Com o contêiner Docker em execução, entre no contêiner utilizando o comando:

```
docker-compose exec ntconsult-challenge /bin/bash
```

2. Dentro do contêiner, execute o comando para rodar os testes unitários:

```
npm run test:unit
```

3. Aguarde até que os testes sejam concluídos.

## Iniciando projeto pelo Node/npm

### Pré-requisitos
- Node.js deve estar instalado na máquina.

### Passos para iniciar o projeto:
1. Execute o comando para instalar as dependências do projeto:

```
npm install
```
Espere até que a instalação seja concluída.

2. Para iniciar o projeto, utilize o comando:

```
npm run serve
```

3. Acesse a aplicação através da URL: [http://localhost:8080/](http://localhost:8080/).

4. Para executar os testes unitários, utilize o comando:

```
npm run test:unit
```

5. Aguarde até que os testes sejam concluídos.