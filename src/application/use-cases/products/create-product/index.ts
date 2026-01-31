import { CreateProduct } from './create-product';
import { CreateProductController } from './create-product.controller';

const createProduct = new CreateProduct();
const createProductController = new CreateProductController(createProduct);

export { createProductController };
