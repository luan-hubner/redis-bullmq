import { Router } from 'express';
import { adaptRoute } from '../http/adapters/express-route.adapter.js';
import { createOrderController } from '../application/use-cases/products/create-order/index.js';

const ordersRoutes = Router();

ordersRoutes.post('/', adaptRoute(createOrderController));

export { ordersRoutes };
