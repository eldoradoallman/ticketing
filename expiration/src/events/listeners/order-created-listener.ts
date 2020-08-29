import { Message } from "node-nats-streaming";
import { Subjects, Listener, OrderCreatedEvent } from "@mandi_telor/common";

import { queueGroupName } from "./queue-group-name";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: OrderCreatedEvent["subject"] = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const { id, expiresAt } = data;

    const delay = new Date(expiresAt).getTime() - new Date().getTime();

    console.log("Waiting this many milliseconds to process the job:", delay);

    await expirationQueue.add({ orderId: id }, { delay });

    msg.ack();
  }
}
