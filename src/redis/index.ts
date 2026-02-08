import Redis from 'ioredis';
import { createClient } from 'redis';

const IORedis = new Redis(6379, '127.0.0.1');

const redisConnection = {
  host: '127.0.0.1',
  port: 6379,
};

/**
 * Subscriber never can be the same instance as publisher.
 * If you try to use the same instance for both, it will not work.
 */

const redisPublisher = createClient({
  socket: {
    host: redisConnection.host,
    port: redisConnection.port,
  },
});

const redisSubscriber = createClient({
  socket: {
    host: redisConnection.host,
    port: redisConnection.port,
  },
});

export { IORedis, redisConnection, redisPublisher, redisSubscriber };
