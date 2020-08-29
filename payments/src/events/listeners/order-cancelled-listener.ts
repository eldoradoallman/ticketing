import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  OrderCancelledEvent,
  OrderStatus,
  NotFoundError,
} from "@mandi_telor/common";

import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: OrderCancelledEvent["subject"] = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const { id, version } = data;

    const order = await Order.findOne({
      _id: id,
      version: version - 1,
    });

    if (!order) throw new NotFoundError();

    order.set({ status: OrderStatus.Cancelled });

    await order.save();

    msg.ack();
  }
}
