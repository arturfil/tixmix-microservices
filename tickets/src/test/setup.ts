import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

// global variable
declare global {
    var signup: () => string[];
}

let mongo:any;

beforeAll(async () => {
    process.env.JWT_KEY = 'asdflaskdfjas';
    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();
    await mongoose.connect(mongoUri);
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
})

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})

global.signup = () => {
    // build a JWT payload {id, email}
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    };
    // Create the JWT -> 
    const token = jwt.sign(payload, process.env.JWT_KEY!)
    // Build Session Object
    const session = {jwt: token};
    // Turn session into JSON
    const sessionJSON = JSON.stringify(session);
    // Encode base64 JSON string
    const base64 = Buffer.from(sessionJSON).toString('base64');
    return [`session=${base64}`];
}
