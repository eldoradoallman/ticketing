import { Publisher, Subjects, TicketCreatedEvent } from "@mandi_telor/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: TicketCreatedEvent["subject"] = Subjects.TicketCreated;
}
