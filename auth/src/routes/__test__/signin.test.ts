import request from 'supertest';
import { app } from '../../app';

it('returns 400 if used non exisiting email', async () => {
    await request(app).post("/api/users/signin").send({
        email: "doesnot@exist.com",
        password: "password"
    }).expect(400);
})

it('returns 400 if user provides wrong password', async () => {
    await request(app).post("/api/users/signup").send({
        email: "test@test.com",
        password: 'password'
    }).expect(201)
    await request(app).post("/api/users/signin").send({
        email: "test@test.com",
        password: "notgoodpassword"
    }).expect(400);
})

it('responds with a cookie when given valid credentials', async () => {
    await request(app).post("/api/users/signup").send({
        email: "test@test.com",
        password: 'password'
    }).expect(201)
    const response = await request(app).post("/api/users/signin").send({
        email: "test@test.com",
        password: 'password'
    }).expect(200)
    expect(response.get("Set-Cookie")).toBeDefined();
})