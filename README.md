
<div align="center"> 

<img src="./markdown/logo_md.png" width="450px" height="200px">

![GitHub repo size](https://img.shields.io/github/repo-size/seu-usuario/path-architecture-api?color=D46162)
![GitHub last commit](https://img.shields.io/github/last-commit/seu-usuario/path-architecture-api?color=D46162)

</div>

# Projeto Path Architecture API

Este repositório contém a implementação de uma aplicação de palestras escolares utilizando **quatro modelos arquiteturais distintos**: monolito, monolito modular, microsserviços e SOA. O objetivo é permitir a comparação prática entre os diferentes estilos arquiteturais, com base em um mesmo caso de uso.

---

## Estruturas Arquiteturais

| Modelo Arquitetural | Descrição |
|---------------------|-----------|
| [Monolito](./monolito/README.md) | Backend unificado com Express e Sequelize. |
| [Monolito com Front Separado](./monolito_modular/README.md) | Backend com entrega de frontend estático via `build/`. |
| [Microsserviços](./microsservico/README.md) | Serviços separados com gateway REST e banco compartilhado. |
| [SOA](./soa/README.md) | Serviços SOAP/XML orquestrados por barramento ESB. |

---

## Sobre o Projeto

- **Tecnologias Base**: Node.js, Express, Sequelize, PostgreSQL, Docker.
- **Documentação**: Swagger e WSDL.
- **Objetivo**: Comparar arquiteturas utilizando um mesmo domínio frontend de aplicação.

---

## Execução

Cada modelo possui seu próprio `README.md` com instruções para execução local com Docker.

---

## Conclusão

Este repositório serve como apoio técnico e prático para a análise comparativa entre diferentes modelos arquitetônicos. Ele foi desenvolvido como parte do Trabalho de Conclusão de Curso (TCC) no CEFET/RJ.