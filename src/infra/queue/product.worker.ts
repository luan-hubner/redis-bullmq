import { Worker } from 'bullmq';
import { IORedis, redisConnection } from '../../redis';

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
    },
  );

  worker.on('completed', (job) => {
    console.log(`✅ job ${job.id} concluído`);
  });

  worker.on('failed', (job, err) => {
    console.error(`⛔ job ${job?.id} falhou:`, { err });
  });
}

export { startWorker };
