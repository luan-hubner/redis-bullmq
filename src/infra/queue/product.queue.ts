import { Queue } from 'bullmq';
import { redisConnection } from '../../redis';

export const productQueue = new Queue('product-queue', {
  connection: redisConnection,
});
