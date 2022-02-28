import express, { Request, Response } from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
const app = express();

// import of routes
import { currentUserRouter } from './routes/current_user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFoundError';
import { User, UserModel } from './models/User';

// middlewares
app.use(express.json());

// routes
// GET/api/users is in the ingress-srv.yaml file
app.get("/api/users", 
    (req: Request, res: Response) => res.json({message: "Testing"})); 
app.use(currentUserRouter)
app.use(signUpRouter)
app.use(signInRouter)
app.use(signOutRouter)
// This should go after ALL other routes
app.all('*', async () => {
    throw new NotFoundError()
});

app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log("Connected to database");
        app.listen(8000, () => console.log("Listening on 8000"))
    } catch (error) {
        console.log(error)        
    }
}

start();