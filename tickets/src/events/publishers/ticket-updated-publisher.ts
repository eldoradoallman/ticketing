import { Publisher, Subjects, TicketUpdatedEvent } from "@mandi_telor/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: TicketUpdatedEvent["subject"] = Subjects.TicketUpdated;
}
