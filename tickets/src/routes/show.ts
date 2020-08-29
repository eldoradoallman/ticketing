import express, { Request, Response } from "express";
import { NotFoundError } from "@mandi_telor/common";

import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  let ticket = null;

  try {
    ticket = await Ticket.findById(req.params.id);
  } catch (err) {
    throw new NotFoundError();
  }

  if (!ticket) throw new NotFoundError();

  res.status(200).send(ticket);
});

export { router as showTicketRouter };
