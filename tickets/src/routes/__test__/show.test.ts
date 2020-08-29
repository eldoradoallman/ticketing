import request from "supertest";

import { app } from "../../app";

it("returns a 404 if the ticket is not found", async () => {
  await request(app)
    .get(`/api/tickets/5f3a7eafce3b70247c6d411a`)
    .send()
    .expect(404);
});

it("returns a ticket if the ticket is found", async () => {
  const title = "New Title";
  const price = 20;

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({ title, price })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
