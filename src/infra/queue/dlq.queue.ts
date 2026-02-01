import { Queue } from 'bullmq';
import { redisConnection } from '../../redis';

export const deadLetterQueue = new Queue('dead-letter-queue', {
  connection: redisConnection,
});
