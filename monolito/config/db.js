const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.PSQL_NAME,
    process.env.PSQL_USER,
    process.env.PSQL_PASS,
    {
        host: process.env.PSQL_HOST,
        port: process.env.PSQL_PORT,
        dialect: 'postgres',
        logging: true,
    }
);

module.exports = sequelize;