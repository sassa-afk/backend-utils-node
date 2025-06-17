// public/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentação APIs backend-utils-node',
      version: '1.0.0',
    },
    tags: [
      {
        name: 'Mail',
        description: 'Rotas para envio de e-mails',
      },
      {
        name: 'Calender',
        description: 'Rotas para integração com Google Calendar',
      },
      {
        name: 'OCRSpace',
        description: 'Rotas para integração para descrição de arquivos para texto ',
      },
    ],
  },
  apis: ['./public/*.js'], // ou ajuste conforme seu caminho de arquivos
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
