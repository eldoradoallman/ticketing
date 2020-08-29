import { Publisher, Subjects, PaymentCreatedEvent } from "@mandi_telor/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: PaymentCreatedEvent["subject"] = Subjects.PaymentCreated;
}
