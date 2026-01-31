import { Router } from 'express';
import { createProductController } from '../application/use-cases/products/create-product/index.js';
import { adaptRoute } from '../http/adapters/express-route.adapter.js';

const productsRoutes = Router();

productsRoutes.post('/', adaptRoute(createProductController));

export { productsRoutes };
