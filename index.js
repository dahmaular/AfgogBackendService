require('dotenv').config();
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
          url: "http://localhost:3001/",
          // url: "https://afgog-backend-service.vercel.app/",
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

// For local development
if (process.env.NODE_ENV !== 'production') {
  const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));
  module.exports = server;
} else {
  // For Vercel serverless
  module.exports = app;
}