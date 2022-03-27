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
})

it("Returns a 401 if the user is not authenticated", async () => {
    const id = new Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({title: "updateTest", price: 22})
        .expect(401);
})

it("Returns a 401 if the user doesn't own the ticket", async () => {})

it("Returns a 400 if the price or title is invalid", async () => {})

it("updates the ticket, given that all conditions for update are met", async () => {

})