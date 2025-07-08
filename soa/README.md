
<div class="corpo" align="center"> 

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
┣ esb/                                  # Enterprise Service Bus (barramento central SOAP)
┃ ┣ esb.wsdl                            # Contrato WSDL com definição dos serviços
┃ ┣ server.js                           # Processa requisições SOAP/XML
┃ ┗ dockerfile                          # Dockerfile do ESB
┣ middleware/                           # Middleware REST → SOAP para integrar com o front
┃ ┣ rest-to-soap.js                     # Converte chamadas REST/JSON em SOAP/XML
┃ ┗ dockerfile                          # Dockerfile do middleware
┣ comentario-service/                   # Serviço de comentários (SOAP)
┃ ┣ comentario.controller.js
┃ ┣ comentario.model.js
┃ ┣ comentario.routes.js
┃ ┣ comentario.service.js
┃ ┣ server.js
┃ ┣ dockerfile
┃ ┗ config/
┃   ┗ database.js
┣ palestra-service/                     # Serviço de palestras (SOAP)
┃ ┣ palestra.controller.js
┃ ┣ palestra.model.js
┃ ┣ palestra.routes.js
┃ ┣ palestra.service.js
┃ ┣ server.js
┃ ┣ dockerfile
┃ ┗ config/
┃   ┗ database.js
┣ perfil-service/                       # Serviço de perfis (SOAP)
┃ ┣ perfil.controller.js
┃ ┣ perfil.model.js
┃ ┣ perfil.routes.js
┃ ┣ perfil.service.js
┃ ┣ server.js
┃ ┣ dockerfile
┃ ┗ config/
┃   ┗ database.js
┣ presenca-service/                     # Serviço de presenças (SOAP)
┃ ┣ presenca.controller.js
┃ ┣ presenca.model.js
┃ ┣ presenca.routes.js
┃ ┣ presenca.service.js
┃ ┣ server.js
┃ ┣ dockerfile
┃ ┗ config/
┃   ┗ database.js
┣ user-service/                         # Serviço de usuários (SOAP)
┃ ┣ usuario.controller.js
┃ ┣ usuario.model.js
┃ ┣ usuario.routes.js
┃ ┣ usuario.service.js
┃ ┣ server.js
┃ ┣ dockerfile
┃ ┗ config/
┃   ┗ database.js
┣ docker-compose.yml                   # Orquestração completa dos serviços + ESB + middleware + banco
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