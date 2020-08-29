import { Message } from "node-nats-streaming";
import { Subjects, Listener, OrderCreatedEvent } from "@mandi_telor/common";

import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: OrderCreatedEvent["subject"] = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const { id, status, version, userId, ticket } = data;

    const order = Order.build({
      id,
      status,
      version,
      userId,
      price: ticket.price,
    });

    await order.save();

    msg.ack();
  }
}
