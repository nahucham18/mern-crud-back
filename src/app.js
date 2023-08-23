import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import routes from './routes/index.routes.js';
import cors from 'cors';


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
                url: 'https://mern-crud-back-9v77lpqer-nahucham18.vercel.app' 
            },  
        ]
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`],
}

const app = express();

app.use(morgan('dev'));
app.use(cors())
app.use(express.json())

app.use("/api", routes);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerSpec)))


export default app;
