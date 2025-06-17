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
  apis: ['./public/*.js'],  
};

const specs = swaggerJsdoc(options);

const docApiSwg = (meotdo , rota , descricao , resposta ) => {
 return `/**
 * @swagger
 * /${rota}:
 *   ${meotdo}:
 *     summary: ${descricao}
 *     responses: ${JSON.stringify(resposta, null, 2)}
 */`;   
}

module.exports = {
  swaggerUi,
  specs,
  docApiSwg,
};
