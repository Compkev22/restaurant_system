'use strict';

//Importaciones
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { corsOptions } from './cors-configuration.js'; 
import { dbConnection } from './db.js';
import { helmetConfiguration } from './helmet-configuration.js';
import { requestLimit } from '../middlewares/request-limit.js';
import { errorHandler } from '../middlewares/handle-errors.js';
import inventoryRoutes from '../src/Inventory/inventory.routes.js';

// Importaciones de Rutas
const BASE_URL = '/restaurantSystem/v1';

const middleware = (app) => {
    app.use(helmet(helmetConfiguration));
    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(requestLimit);
    app.use(morgan('dev'));
}

const routes = (app) => {
    // Registro de la ruta base para inventario
    app.use(`${BASE_URL}/inventory`, inventoryRoutes);
    
    // Health check
    app.get(`${BASE_URL}/health`, (req, res) => {
        res.status(200).json({ status: 'ok', service: 'Restaurant_System Admin' });
    });
}

const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3001;

    try {
        await dbConnection();
        middleware(app);
        
        // Las rutas deben cargarse ANTES que el manejador de errores
        routes(app);

        // El manejador de errores siempre debe ir al final
        app.use(errorHandler);

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
        });

    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
}

export { initServer };