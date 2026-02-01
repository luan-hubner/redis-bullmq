import express from 'express';
import { productsRoutes } from './routes/products.routes';
import { startWorker } from './infra/queue/product.worker';

export const app = express();

app.use(express.json());
app.use('/products', productsRoutes);

function startServer() {
  app.listen(3333, () => {
    console.log(`server is running on port ${3333}. enjoy! 🚀`);
  });
}

startServer();
startWorker();
