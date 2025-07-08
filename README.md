
<div align="center"> 

</div>

# Projeto Path Architecture API

Este repositório contém a implementação de uma aplicação de palestras escolares utilizando **quatro modelos arquiteturais distintos**: monolito, monolito modular, microsserviços e SOA. O objetivo é permitir a comparação prática entre diferentes estilos arquiteturais com base em um mesmo domínio e conjunto de funcionalidades.

---

## Estruturas Arquiteturais

| Modelo Arquitetural | Descrição |
|---------------------|-----------|
| [Monolito](./monolito/README.md) | Backend unificado com Express e Sequelize. Frontend é incorporado via pasta `/build` |
| [Monolito Modular](./monolito_modular/README.md) | Backend modularizado por domínios funcionais. Frontend é incorporado via pasta `/build`. |
| [Microsserviços](./microsservico/README.md) | Serviços independentes com comunicação via REST e orquestração por API Gateway. Cada serviço possui seu próprio banco. |
| [SOA](./soa/README.md) | Serviços integrados via SOAP/XML e organizados em torno de um barramento ESB. Utiliza middleware REST para compatibilidade com o frontend. |

---

## Sobre o Projeto

- **Tecnologias Base**: Node.js, Express, Sequelize, PostgreSQL, Docker.
- **Documentação**: Swagger.
- **Frontend**: Aplicação em React/TypeScript integrada com todas as versões.
- **Objetivo**: Comparar arquiteturas utilizando um mesmo domínio de aplicação, avaliando organização, escalabilidade, acoplamento e integração.

---

## Execução

Cada modelo possui seu próprio `README.md` com instruções detalhadas para execução local via Docker e configuração de ambiente.

---

## Conclusão

Este repositório é parte do Trabalho de Conclusão de Curso (TCC) desenvolvido no CEFET/RJ. Ele serve como base prática e técnica para demonstrar a evolução arquitetural de aplicações, destacando vantagens, desafios e particularidades de cada abordagem estudada.
