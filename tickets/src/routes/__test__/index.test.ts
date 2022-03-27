import request from 'supertest'
import { app } from "../../app"

const createTicket = async () => {
    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signup())
        .send({
            title: "Test 1",
            price: 20
        });
}

it("Should return all tickets", async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app)
        .get("/api/tickets")
        .send()
        .expect(200);

    expect(response.body.length).toEqual(3);
});
