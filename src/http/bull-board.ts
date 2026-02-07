import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { productQueue } from '../infra/queue/product.queue';

export const bullBoardServerAdapter = new ExpressAdapter();
bullBoardServerAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullMQAdapter(productQueue)],
  serverAdapter: bullBoardServerAdapter,
});
