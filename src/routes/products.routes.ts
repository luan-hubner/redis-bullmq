import { Router } from 'express';
import { createProductController } from '../application/use-cases/products/create-product/index.js';
import { adaptRoute } from '../http/adapters/express-route.adapter.js';
import { showProductsController } from '../application/use-cases/products/show-products/index.js';

const productsRoutes = Router();

productsRoutes.post('/', adaptRoute(createProductController));
productsRoutes.get('/', adaptRoute(showProductsController));

export { productsRoutes };
