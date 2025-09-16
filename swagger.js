import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
    definition: {
      openapi: '3.0.0', // Specify the version of OpenAPI
      info: {
        title:  'Travel Planner System',
        version: '1.0.0',
        description: 'API documentation with Swagger which used real-time inter-provincial bus seats reservation in NTC',
      },
      servers: [
        {
          url: "http://13.60.76.232/", // API server URL
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
    apis: [path.join(__dirname,'./routes/*.js')], // Path to the route files
  };

  const swaggerDocs = swaggerJSDoc(swaggerOptions);

  export {swaggerUi,swaggerDocs};