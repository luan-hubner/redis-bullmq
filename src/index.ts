import express from 'express';
import { productsRoutes } from './routes/products.routes';
import { startWorker } from './infra/queue/product.worker';
import { bullBoardServerAdapter } from './http/bull-board';

export const app = express();

app.use(express.json());
app.use('/products', productsRoutes);

app.use('/admin/queues', bullBoardServerAdapter.getRouter());

function startServer() {
  app.listen(3333, () => {
    console.log(`server is running on port ${3333}. enjoy! 🚀`);
  });
}

startServer();
startWorker();
