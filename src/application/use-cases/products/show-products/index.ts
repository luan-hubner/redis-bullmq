import { ShowProducts } from './show-products';
import { ShowProductsController } from './show-products.controller';

const showProducts = new ShowProducts();
const showProductsController = new ShowProductsController(showProducts);

export { showProductsController };
