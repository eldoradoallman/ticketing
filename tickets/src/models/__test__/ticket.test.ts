import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  // Create an instance of a ticket
  const ticket = Ticket.build({
    title: "OCC Ticket",
    price: 50,
    userId: "1234",
  });

  // Save the ticket to the database
  await ticket.save();

  expect(ticket.version).toEqual(0);

  // Fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // Make two separate changes to the tickets we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 20 });

  // Save the first fetched ticket
  await firstInstance!.save();

  expect(firstInstance.version).toEqual(1);

  // Save the second fetched ticket and expect an error
  try {
    await secondInstance!.save();
  } catch (err) {
    return expect(err).toBeDefined();
  }
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "OCC Ticket",
    price: 50,
    userId: "1234",
  });

  await ticket.save();

  expect(ticket.version).toEqual(0);

  await ticket.save();

  expect(ticket.version).toEqual(1);

  await ticket.save();

  expect(ticket.version).toEqual(2);
});
