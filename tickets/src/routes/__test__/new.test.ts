import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/tickets';

it("has a route listening to POST/api/tickets", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .send({})

    expect(response.status).not.toEqual(404);
})

it("can only be accessed if user is signed in", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .send({})
        .expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signup())
        .send({})
    expect(response.status).not.toEqual(401);
})

it("returns an error if invalid title is provided", async () => {
    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signup())
        .send({
            price: 10
        })
        .expect(400);
        
        await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signup())
        .send({
            title: '',
            price: 10
        })
        .expect(400);
})

it("returns an error if invalid price is provided", async () => {
    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signup())
        .send({
            title: "test ticket",
            price: -10
        })
        .expect(400);

        await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signup())
        .send({
            title: "test ticket"
        })
        .expect(400);
})

it("Creates a ticket with valid inputs ", async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);
    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signup())
        .send({
            title: "test ticket 1",
            price: 20,
        })
        .expect(201); // succesful creation
    tickets = await Ticket.find();
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(20);
})