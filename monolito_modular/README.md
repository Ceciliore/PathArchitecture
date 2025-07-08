
## Visão Geral

Este repositório contém a implementação da **arquitetura monolítica modular** para a aplicação de gerenciamento de palestras. Trata-se de uma evolução da arquitetura monolítica tradicional, mantendo o **deploy unificado**, mas introduzindo uma **organização interna por domínios funcionais** (como `usuario`, `palestra`, `comentario`, etc.), com separação clara entre modelos, serviços, controladores e rotas dentro de cada módulo.

Além disso, o **frontend foi desacoplado** e construído separadamente (com React ou Angular), sendo incorporado via pasta `build/` no backend. Essa divisão respeita o princípio da separação de responsabilidades e prepara o projeto para futuras evoluções arquiteturais, como a migração para microsserviços.

---

## Arquitetura

- Linguagem: JavaScript
- Backend: Node.js + Express
- Organização modular por domínio
- Frontend: React/Angular (compilado e servido pela pasta `/build`)
- Banco de Dados: PostgreSQL
- ORM: Sequelize
- Autenticação: Em desenvolvimento
- Documentação: Swagger (em breve)
- Hospedagem: Docker + Render

### Estrutura modular de exemplo

```
monolito_modular/
┣ build/                         # Frontend React compilado (via npm run build)
┣ modules/                       # Módulos organizados por domínio funcional
┃ ┣ comentario/
┃ ┃ ┣ comentario.controller.js   # Controlador HTTP
┃ ┃ ┣ comentario.model.js        # Modelo Sequelize
┃ ┃ ┣ comentario.routes.js       # Rotas REST
┃ ┃ ┗ comentario.service.js      # Regras de negócio
┃ ┣ palestra/
┃ ┃ ┣ palestra.controller.js
┃ ┃ ┣ palestra.model.js
┃ ┃ ┣ palestra.routes.js
┃ ┃ ┗ palestra.service.js
┃ ┣ perfil/
┃ ┃ ┣ perfil.controller.js
┃ ┃ ┣ perfil.model.js
┃ ┃ ┣ perfil.routes.js
┃ ┃ ┗ perfil.service.js
┃ ┣ presenca/
┃ ┃ ┣ presenca.controller.js
┃ ┃ ┣ presenca.model.js
┃ ┃ ┣ presenca.routes.js
┃ ┃ ┗ presenca.service.js
┃ ┗ usuario/
┃ ┃ ┣ usuario.controller.js
┃ ┃ ┣ usuario.model.js
┃ ┃ ┣ usuario.routes.js
┃ ┃ ┗ usuario.service.js
┣ config/
┃ ┗ database.js                 # Configuração da conexão com PostgreSQL
┣ routes/
┃ ┗ index.js                    # Importa e registra as rotas dos módulos
┣ .env                          # Variáveis de ambiente (porta, DB, usuário, senha)
┣ docker-compose.yml           # Orquestração dos containers (app + banco)
┣ dockerfile                    # Build da imagem Docker da aplicação
┣ package.json
┣ server.js                     # Ponto de entrada principal da API
┣ seed.js                       # População inicial do banco com dados de exemplo
```

---

## Diferenciais da Arquitetura Modular

- Organização por domínios e não por tipo de arquivo
- Cada domínio com seus próprios controladores, modelos, serviços e rotas
- Maior legibilidade e manutenção facilitada
- Prepara o projeto para futura migração a microsserviços
- Evita o acoplamento típico do monólito tradicional

---

## API REST

### Exemplo: Palestras
- `POST /api/palestras` – Criar palestra
- `GET /api/palestras` – Listar palestras

### [Outros endpoints]
(Adicionar conforme a implementação)

---

## Banco de Dados

O PostgreSQL armazena as seguintes entidades:

- Usuario
- Perfil
- Palestra
- Comentario
- Presenca

Modelos definidos nos módulos correspondentes utilizando Sequelize.

---

## Documentação (Swagger)

Será disponibilizada em:

```
http://localhost:3333/api-docs
```

---

## Como Rodar Localmente

```bash
git clone https://github.com/seu-usuario/monolito_modular.git
cd monolito_modular
```

Crie um arquivo `.env` com os parâmetros:

```env
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=monolito_db
DB_HOST=localhost
```

E execute:

```bash
docker-compose up --build
```

A aplicação estará disponível em `http://localhost:3333`

---

## Conclusão

Esta arquitetura modulariza internamente uma aplicação monolítica, segmentando responsabilidades por domínios funcionais. Com isso, garante maior escalabilidade, clareza de código e viabiliza uma transição mais segura para arquiteturas distribuídas como microsserviços ou SOA.