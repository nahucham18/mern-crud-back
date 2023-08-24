import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import routes from './routes/index.routes.js';
import cors from 'cors';
import bodyParser from 'body-parser';

//swagger  
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import { fileURLToPath } from 'url';

//path
import path from 'path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('Ruta de definición de rutas:', `${path.join(__dirname, "./routes/*.js")}`);

const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Examen-Tecnico",
            version: "1.0.0",
        },
        servers: [
            {
                url: process.env.API_BASE_URL
            },
            {
                url: 'http://localhost:3001'
            },
        ]
    },
    apis: [
        "./src/routes/*.routes.js",
    ],
}

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

app.use("/api", routes);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerSpec)))

app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerJsDoc(swaggerSpec));
  });
  console.log(
    `Version 1 Docs are available on http://localhost:3001/api-docs`
  );

export default app;
