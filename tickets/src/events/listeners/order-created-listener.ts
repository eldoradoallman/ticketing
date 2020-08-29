import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  OrderCreatedEvent,
  NotFoundError,
} from "@mandi_telor/common";

import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: OrderCreatedEvent["subject"] = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const { id, ticket } = data;

    // Find the ticket that the order is reserving
    const orderedTicket = await Ticket.findById(ticket.id);

    // If no ticket, throw error
    if (!orderedTicket) throw new NotFoundError();

    // Mark the ticket as being reserved by setting its orderId property
    orderedTicket.set({ orderId: id });

    // Save the ticket
    await orderedTicket.save();

    await new TicketUpdatedPublisher(this.client).publish({
      id: orderedTicket.id,
      version: orderedTicket.version,
      title: orderedTicket.title,
      price: orderedTicket.price,
      userId: orderedTicket.userId,
      orderId: orderedTicket.orderId,
    });

    // Ack the message
    msg.ack();
  }
}
