
<div class="corpo" align="center"> 

<img src="./markdown/logo_md.png" width="450px" height="200px">

![GitHub language count](https://img.shields.io/github/languages/count/seu-usuario/microsservico?color=D46162)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/seu-usuario/microsservico?color=D46162)

</div>

## Visão Geral

Este repositório contém a versão da aplicação de gestão de palestras escolares desenvolvida com a arquitetura de microsserviços. Cada entidade funcional (usuários, palestras, presenças, etc.) é gerenciada por um serviço independente, promovendo baixo acoplamento e escalabilidade.

---

## Arquitetura

- Linguagem: JavaScript
- Framework: Node.js + Express
- Banco de Dados: PostgreSQL
- ORM: Sequelize
- Comunicação: RESTful entre serviços
- Autenticação: Em desenvolvimento
- Documentação: Swagger (em breve)
- Hospedagem: Docker + Docker Compose

```
microsservico/
┣ user-service/
┃ ┣ src/
┃ ┃ ┣ controllers/
┃ ┃ ┣ models/
┃ ┃ ┗ routes/
┃ ┣ server.js
┣ palestra-service/
┃ ┣ src/
┃ ┃ ┣ controllers/
┃ ┃ ┣ models/
┃ ┃ ┗ routes/
┃ ┣ server.js
┣ gateway/
┃ ┣ src/
┃ ┃ ┗ routes/
┃ ┣ server.js
┣ docker-compose.yml
```

---

## API REST

Cada serviço possui seu próprio conjunto de rotas expostas via API REST. As principais rotas são acessadas através do gateway:

### Usuários
- POST /usuarios/login
- POST /usuarios
- GET /usuarios

### Palestras
- POST /palestras
- GET /palestras

---

## Banco de Dados

Cada serviço se comunica com o mesmo banco PostgreSQL compartilhado. As tabelas principais incluem:

- usuarios
- perfis
- palestras
- comentarios
- presencas

---

## Documentação (Swagger)

A documentação Swagger para cada serviço será disponibilizada em breve nas respectivas portas.

---

## Como Rodar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/microsservico.git
cd microsservico
```

2. Configure variáveis de ambiente se necessário.

3. Suba todos os containers com Docker Compose:
```bash
docker-compose up --build
```

4. Acesse a aplicação via gateway:
```bash
http://localhost:3001
```

---

## Conclusão

A arquitetura de microsserviços permite distribuir responsabilidades, facilitando escalabilidade, manutenção e evolução independente dos serviços. Esta versão serve como comparação prática com os modelos monolito, monolito modular e SOA.