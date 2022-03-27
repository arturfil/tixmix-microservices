import request from "supertest"
import { Types } from 'mongoose'
import { app } from "../../app"

it("Returns a 404 id the provided id does not exist", async () => {
    const id = new Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set("Cookie", global.signup())
        .send({title: "updateTest", price: 22})
        .expect(404);
});

it("Returns a 401 if the user is not authenticated", async () => {
    const id = new Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({title: "updateTest", price: 22})
        .expect(401);
});

it("Returns a 401 if the user doesn't own the ticket", async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signup())
        .send({title: "Test_Ticket", price: 23});

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signup())
        .send({title: "Test_Tix", price: 34})
        .expect(401);
});

it("Returns a 400 if the price or title is invalid", async () => {
    const cookie = global.signup()
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({title: "Test_Ticket", price: 23});

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({title: "", price: 34})
        .expect(400);

        await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({title: "test_title", price: -34})
        .expect(400);        
})

it("updates the ticket, given that all conditions for update are met", async () => {
    const cookie = global.signup()
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({title: "Test_Ticket", price: 23});

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({title: "good_ticket", price: 44})
        .expect(202);

    const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`)
        .send();
    
    expect(ticketResponse.body.title).toEqual('good_ticket');
})