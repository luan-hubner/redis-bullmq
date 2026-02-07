import { Worker } from 'bullmq';
import { IORedis, redisConnection } from '../../redis';
import { deadLetterQueue } from './dlq.queue';

async function startWorker() {
  const worker = new Worker(
    'product-queue',
    async (job) => {
      try {
        console.log('⚙️ processing job:', job.name);
        console.log('📁 job data:', { data: job.data });

        if (job.name === 'create-product') {
          // do someting cool xD
          await IORedis.hset(`product:${job.id}`, job.data);
        }
      } catch (error: any) {
        if (error.code === 'MAX_STOCK') {
          // will not retry
          return;
        }

        // allow to retry
        throw error;
      }
    },
    {
      connection: redisConnection,
      concurrency: 5,
      limiter: {
        max: 20,
        duration: 1000,
      },
    },
  );

  worker.on('completed', (job) => {
    console.log(`✅ job ${job.id} concluído`);
  });

  worker.on('failed', async (job, err) => {
    if (!job) return;

    console.error(`⛔ job ${job.id} falhou:`, { err });

    const attemptsMade = job.attemptsMade ?? 1;
    const maxAttempts = job.opts.attempts ?? 1;

    if (attemptsMade >= maxAttempts) {
      await deadLetterQueue.add(
        'create-product-failed',
        {
          originalJobId: job.id,
          queue: job.queueName,
          data: job.data,
          error: err.message,
        },
        {
          removeOnComplete: false,
          jobId: `dlq:${job.id}`,
        },
      );
    }
  });
}

export { startWorker };
