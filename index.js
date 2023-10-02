const express = require("express");
const app = express();
const winston = require('winston');

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// require('./src/config/loggings')();
require('./src/config/routes')(app);
require('./src/config/db')();
require('./src/config/config')();
require('./src/config/validation')();

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Afgog shop API by Flicker Rave",
        version: "1.0.0",
        description: "Afgog shop API",
      },
      servers: [
        {
          url: "https://afgog-api.onrender.com",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ["./src/api/routes/*.js"],
  };
  
  const specs = swaggerJsDoc(options);
  
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

const port = process.env.PORT || 3001;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;