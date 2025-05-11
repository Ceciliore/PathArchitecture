const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.PSQL_NAME,
  process.env.PSQL_USER,
  process.env.PSQL_PASS,
  {
    host: process.env.PSQL_HOST,
    port: process.env.PSQL_PORT,
    dialect: 'postgres',
    logging: false,
    retry: {
      max: 10, // tenta até 10 vezes
    }
  }
);

module.exports = sequelize;
