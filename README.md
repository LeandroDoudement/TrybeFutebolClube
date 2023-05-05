# Trybe Futebol Clube

Esse repositório contém um projeto prático desenvolvido durante o curso de Desenvolvimento de Software da [Trybe](https://www.betrybe.com/). O objetivo do projeto é desenvolver um sistema para gerenciamento de um time de futebol, utilizando conceitos de Programação Orientada a Objetos (POO) e SOLID.

## Descrição Geral

O Trybe Futebol Clube é um sistema para gerenciamento de um time de futebol, onde é possível cadastrar jogadores, criar partidas, definir escalações, gerar relatórios e estatísticas, entre outras funcionalidades.

O projeto foi desenvolvido com o objetivo de aplicar os conceitos de Programação Orientada a Objetos (POO) e SOLID, visando uma arquitetura bem estruturada e fácil de manter.

## Funcionalidades

O Trybe Futebol Clube possui as seguintes funcionalidades:

- Cadastrar jogadores e suas informações
- Criar partidas e definir escalações
- Gerar relatórios e estatísticas do time e dos jogadores
- Visualizar o histórico de partidas e resultados
- Calcular a pontuação do time em um campeonato

<details>
<summary><strong> Estrutura do projeto</strong></summary><br />

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**
  - Tem o papel de fornecer dados para o serviço de _backend_.
  - Durante a execução dos testes sempre vai ser acessado pelo `sequelize` e via porta `3002` do `localhost`;
  - Você também pode conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço `db`.

2️⃣ **Back-end:**
 - Deve rodar na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
 - Sua aplicação deve ser inicializada a partir do arquivo `app/backend/src/server.ts`;
 - Garanta que o `express` é executado e a aplicação ouve a porta que vem das variáveis de ambiente;
 - Todas as dependências extras (tal como `joi`, `boom`, `express-async-errors`...) devem ser listadas em `app/backend/packages.npm`.

3️⃣ **Front-end:**
  - O front se comunica com serviço de back-end pela url `http://localhost:3001` através dos endpoints que você deve construir nos requisitos.

4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up`;

</details>
