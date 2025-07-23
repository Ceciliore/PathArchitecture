const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Palestras',
            version: '1.0.0',
            description: 'Documentação da API do sistema de palestras',
        },
        servers: [
            {
                url: 'http://localhost:3333/api',
            },
        ],
    },
    apis: ['./server.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec,
};
