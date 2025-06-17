// public/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API',
      version: '1.0.0',
    },
  },
  apis: ['./public/*.js'], // Ou onde estão suas rotas
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
