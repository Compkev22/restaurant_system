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

// Importaciones de Rutas
const BASE_URL = '/restaurantSystem/v1';
import userRoutes from '../src/User/user.routes.js';
import combosRoutes from '../src/Combo/combo.routes.js';
import eventRoutes from '../src/Event/event.routes.js';
import inventoryRoutes from '../src/Inventory/inventory.routes.js';
import menuRoutes from '../src/Menú/menu.routes.js';
import tableRoutes from '../src/Table/table.routes.js';
import reservationRoutes from '../src/Reservation/reservation.routes.js';
import saleRoutes from '../src/Sale/sale.routes.js';
import employeeRoutes from '../src/Employee/employee.routes.js';
import productRoutes from '../src/Product/product.routes.js';
import orderRoutes from '../src/Order/order.routes.js';
import branchRoutes from '../src/Branch/branch.routes.js';
import billingRoutes from '../src/Billing/billing.routes.js';
import authRoutes from '../src/Auth/auth.routes.js';
import detalleInventarioRoutes from '../src/DetalleInventario/detalleInventario.routes.js';
import detalleComboRoutes from '../src/DetalleCombo/detalleCombo.routes.js';



const middleware = (app) => {
    app.use(helmet(helmetConfiguration));
    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(requestLimit);
    app.use(morgan('dev'));
}

const routes = (app) => {
    app.use(`${BASE_URL}/users`, userRoutes);
    app.use(`${BASE_URL}/combos`, combosRoutes);
    app.use(`${BASE_URL}/events`, eventRoutes);
    app.use(`${BASE_URL}/inventory`, inventoryRoutes);
    app.use(`${BASE_URL}/menu`, menuRoutes);
    app.use(`${BASE_URL}/tables`, tableRoutes);
    app.use(`${BASE_URL}/reservations`, reservationRoutes);
    app.use(`${BASE_URL}/sales`, saleRoutes);
    app.use(`${BASE_URL}/employee`, employeeRoutes);
    app.use(`${BASE_URL}/product`, productRoutes);
    app.use(`${BASE_URL}/order`, orderRoutes);
    app.use(`${BASE_URL}/branch`, branchRoutes);
    app.use(`${BASE_URL}/billing`, billingRoutes);
    app.use(`${BASE_URL}/auth`, authRoutes);
    app.use(`${BASE_URL}/detalleInventario`, detalleInventarioRoutes);
    app.use(`${BASE_URL}/detalleCombo`, detalleComboRoutes);
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