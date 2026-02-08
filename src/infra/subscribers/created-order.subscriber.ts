import { redisSubscriber } from '../../redis';

export async function createdOrderSubscriber() {
  await redisSubscriber.connect();
  await redisSubscriber.subscribe('order:created', (message) => {
    const order = JSON.parse(message);

    console.log(`📥 New order (${order.id}) was created, sending e-mails...`);
    console.log(`⚙️ Updating stock for product ${order.productId}...`);

    setTimeout(() => {
      console.log(`📧 E-mails for order ${order.id} were sent successfully!`);
    }, 2000);
  });
}
