import { Publisher, Subjects, OrderCreatedEvent } from "@mandi_telor/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: OrderCreatedEvent["subject"] = Subjects.OrderCreated;
}
