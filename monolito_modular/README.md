
<div class="corpo" align="center"> 

<img src="./markdown/logo_md.png" width="450px" height="200px">

![GitHub language count](https://img.shields.io/github/languages/count/seu-usuario/monolito_modular?color=D46162)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/seu-usuario/monolito_modular?color=D46162)

</div>

## Visão Geral

Este repositório contém a versão monolítica com frontend desacoplado, onde a aplicação backend foi construída em Node.js com Express, e o frontend foi desenvolvido separadamente e incorporado via pasta `build/`. Essa versão mantém a simplicidade da arquitetura monolítica, mas separa as responsabilidades de frontend e backend em camadas distintas.

---

## Arquitetura

- Linguagem: JavaScript
- Framework: Node.js + Express
- Frontend: Web estático (Angular ou React compilado)
- Banco de Dados: PostgreSQL
- ORM: Sequelize
- Autenticação: Em desenvolvimento
- Documentação: Swagger (em breve)
- Hospedagem: Docker + Render (ou outro)

```
monolito_modular/
┣ build/
┃ ┣ index.html
┃ ┣ favicon.ico
┃ ┗ ...
┣ models/
┃ ┣ Comentario.js
┃ ┣ Palestra.js
┃ ┣ Perfil.js
┃ ┣ Presenca.js
┃ ┣ Usuario.js
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

O banco PostgreSQL armazena as entidades:

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
git clone https://github.com/seu-usuario/monolito_modular.git
cd monolito_modular
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

Este projeto representa uma variação da arquitetura monolítica com separação visual de responsabilidades, facilitando o desenvolvimento modular e comparações com arquiteturas mais distribuídas como microsserviços e SOA.