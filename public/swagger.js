// public/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentação APIs backend-utils-node ',
      version: '1.0.0',
    },
  },
  apis: ['./public/*.js'],  
};

const specs = swaggerJsdoc(options);


module.exports = {
  swaggerUi,
  specs,
   
};
