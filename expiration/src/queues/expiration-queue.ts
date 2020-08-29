import Queue from "bull";

import { natsWrapper } from "../nats-wrapper";
import { ExpirationCompletePublisher } from "../events/publishers/expiration-complete-publisher";

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>("order:expiration", {
  redis: { host: process.env.REDIS_HOST },
});

expirationQueue.process(async (job) => {
  const { data } = job;

  console.log(
    "I want to publish an expiration:complete event for orderId",
    data.orderId
  );

  new ExpirationCompletePublisher(natsWrapper.client).publish({
    orderId: data.orderId,
  });
});

export { expirationQueue };
