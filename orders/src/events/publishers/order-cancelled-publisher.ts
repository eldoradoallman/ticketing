import { Publisher, Subjects, OrderCancelledEvent } from "@mandi_telor/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: OrderCancelledEvent["subject"] = Subjects.OrderCancelled;
}
