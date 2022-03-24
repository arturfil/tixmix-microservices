import express, { Request, Response } from 'express';
import 'express-async-errors';

import cookieSession from 'cookie-session';
const app = express();

// import of routes
import { currentUserRouter } from './routes/current_user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@tixmix/common';

// middlewares
app.use(express.json());
app.set('trust proxy', true);
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
);

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

export { app };