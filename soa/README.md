
<div class="corpo" align="center"> 

<img src="./markdown/logo_md.png" width="450px" height="200px">

![GitHub language count](https://img.shields.io/github/languages/count/seu-usuario/soa?color=D46162)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/seu-usuario/soa?color=D46162)

</div>

## Visão Geral

Este repositório contém a versão da aplicação de gestão de palestras escolares utilizando o modelo de Arquitetura Orientada a Serviços (SOA). Neste modelo, os serviços são expostos via SOAP/XML e orquestrados por um barramento de serviços (ESB), respeitando os princípios clássicos do SOA.

---

## Arquitetura

- Linguagem: JavaScript
- Framework: Node.js + Express
- Banco de Dados: PostgreSQL
- ORM: Sequelize
- Comunicação: SOAP (via WSDL)
- Middleware: REST -> SOAP
- Barramento: ESB (Enterprise Service Bus)
- Hospedagem: Docker + Docker Compose

```
soa/
┣ user-service/
┃ ┣ controllers/
┃ ┣ models/
┃ ┗ server.js
┣ palestra-service/
┃ ┣ controllers/
┃ ┣ models/
┃ ┗ server.js
┣ comentario-service/
┣ presenca-service/
┣ esb/
┃ ┣ esb.wsdl
┃ ┗ server.js
┣ rest-to-soap/
┃ ┗ index.js
┣ docker-compose.yml
```

---

## API REST (via Middleware REST->SOAP)

Para compatibilidade com o frontend, o sistema expõe endpoints REST que são convertidos em chamadas SOAP:

### Exemplo:
- POST /usuarios/login -> convertida para método SOAP `LoginUsuario`
- GET /palestras -> convertida para `ListarPalestras`

---

## Banco de Dados

Todos os serviços compartilham um único banco PostgreSQL. Tabelas utilizadas:

- usuarios
- perfis
- palestras
- comentarios
- presencas

---

## Documentação (Swagger)

A documentação REST será disponibilizada para o middleware. A documentação SOAP está descrita no arquivo `esb.wsdl`.

---

## Como Rodar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/soa.git
cd soa
```

2. Configure o `.env` para cada serviço.

3. Suba os containers:
```bash
docker-compose up --build
```

4. Acesse o middleware (REST):
```bash
http://localhost:3001
```

---

## Conclusão

Este projeto aplica fielmente o modelo SOA, com uso de ESB e comunicação SOAP/XML. Ele permite comparar de forma prática as diferenças entre este modelo e os demais (monolito, monolito modular e microsserviços), especialmente em relação à orquestração, padronização de mensagens e interoperabilidade.