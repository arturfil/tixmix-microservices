import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log("Connected to database");
        app.listen(8000, () => console.log("Listening on 8000"))
    } catch (error) {
        console.log(error)        
    }
}

start();