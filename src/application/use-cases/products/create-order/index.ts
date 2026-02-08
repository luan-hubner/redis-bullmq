import { CreateOrder } from './create-order';
import { CreateOrderController } from './create-order.controller';

const createOrder = new CreateOrder();
const createOrderController = new CreateOrderController(createOrder);

export { createOrderController };
