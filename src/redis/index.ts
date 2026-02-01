import Redis from 'ioredis';

const IORedis = new Redis(6379, '127.0.0.1');

const redisConnection = {
  host: '127.0.0.1',
  port: 6379,
};

export { IORedis, redisConnection };
