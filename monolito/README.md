<div class="corpo" align="center"> 

<img src="./markdown/logo_md.png" width="450px" height="200px">

![GitHub language count](https://img.shields.io/github/languages/count/seu-usuario/monolito?color=D46162)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/seu-usuario/monolito?color=D46162)

</div>

## Visão Geral

Este repositório contém a versão monolítica da aplicação de gestão de palestras escolares, desenvolvida para o projeto de conclusão de curso no CEFET/RJ. A aplicação expõe uma API RESTful construída com Node.js e Express, utilizando PostgreSQL via Sequelize ORM.

---

## Arquitetura

- Linguagem: JavaScript
- Framework: Node.js + Express
- Banco de Dados: PostgreSQL
- ORM: Sequelize
- Autenticação: Em desenvolvimento
- Documentação: Swagger (em breve)
- Hospedagem: Docker + Render (ou outro)

```
monolito/
┣ config/
┃ ┗ db.js
┣ models/
┃ ┣ Comentario.js
┃ ┣ Palestra.js
┃ ┣ Perfil.js
┃ ┣ Presenca.js
┃ ┣ Usuario.js
┃ ┗ index.js
┣ build/
┣ seed.js
┣ server.js
┣ dockerfile
┣ docker-compose.yml
```

---

## API REST

### Palestras
- POST /api/palestras - Criar palestra
- GET /api/palestras - Listar palestras

### [Outros endpoints]
(Adicionar conforme forem implementados)

---

## Banco de Dados

O banco PostgreSQL armazena informações como:

- usuarios
- perfis
- palestras
- comentarios
- presencas

Modelos definidos em `models/` com Sequelize.

---

## Documentação (Swagger)

A documentação Swagger será disponibilizada em breve em:

http://localhost:3333/api-docs

---

## Como Rodar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/monolito.git
cd monolito
```

2. Configure o arquivo `.env` (se aplicável):

```env
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=monolito_db
DB_HOST=localhost
```

3. Suba os containers com Docker:
```bash
docker-compose up --build
```

4. Acesse a aplicação:
```bash
http://localhost:3333
```

---

## Conclusão

Este projeto representa a versão inicial monolítica da aplicação de gestão de palestras, servindo como base para comparações com outras arquiteturas como microsserviços, monolito modular e SOA. Com código simples, claro e direto, o sistema permite gerenciar dados acadêmicos e será expandido com autenticação, testes e documentação completa.