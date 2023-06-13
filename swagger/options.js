require('dotenv').config();
const isProduction = process.env.NODE_ENV === 'production'

exports.swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "LEARNLY API",
        version: "1.0.0",
        description:
          "Learnly API Documentation",
        license: {
          name: "MIT",
          url: "https://localhost"
        },
        contact: {
          name: "Support",
          url: "http://localhost",
          email: "muchokileon@gmail.com"
        }
      },
      servers: [
        {
          url: isProduction ? "http://localhost:8080/" : "http://localhost:8080/",
          description: isProduction ? "Production Server" : "Local server"
        }
      ]
    },
    apis: ["./swagger/api-method-docs.js"]
  };