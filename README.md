<a id="readme-top"></a>

[![LinkedIn][linkedin-shield]][linkedin-url]

<br />

## About The Project

It's a simple usage example of queues and caching. I choose Redis + BullMQ to handle this responsabilities.

Of course, this setup was created just as studying project, has many nedeed changes and better choices of approachs. In a real case I will not use a Queue only to add a new Product in cache 🤣

### Built With

[![Node][nodejs-shield]][nodejs-url]
[![Redis][redis-shield]][redis-url]
[![BullMQ][bullmq-shield]][bullmq-url]

## Getting Started

### Prerequisites

To run this app you will need _Node.js_ and a _Redis_ server.

To run a simple Redis server you can do it with Docker:

```sh
docker run -d -p 6379:6379 redis:alpine
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/luan-hubner/redis-bullmq.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your DATABASE_URL in `.env`
   ```js
   const DATABASE_URL = 'POSTGRESQL_DATABASE_URL';
   ```
4. Start APP
   ```sh
   npm run start:dev
   ```

## What's going on?

I tried to apply some queueing concepts in this project like: Queue, Worker, QueueEvents, Jobs (delayed jobs, repatable jobs, retries), backoff and Dead Letter Queues.

Basically when a new product is created the use-case will add a job named 'create-product' in ProductQueue. The ProductQueue Worker will handle this job and just as example, it will add the product on Redis as a _hash_ with `IORedis.hset`

After product creation the APP will clear Redis product caching and the products will be cached again everytime that ShowProducts be called.

To monitoring the queues I used [bull-board](https://github.com/felixmosh/bull-board) package, this lib provides a good dashboard to inspect Queues.

And just to finish, I used Drizzle as ORM.

## Contact

Luan Hubner - luanhubner.pro@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[redis-shield]: https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white
[redis-url]: https://redis.io/
[bullmq-shield]: https://img.shields.io/badge/BullMQ-a855f7?style=for-the-badge
[bullmq-url]: https://bullmq.io/
[nodejs-shield]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[nodejs-url]: https://nodejs.org/en
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/luanhubner
