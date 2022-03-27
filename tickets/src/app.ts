import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@tixmix/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';
const app = express();

// import of routes

// middlewares
app.use(express.json());
app.set('trust proxy', true);
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
);
app.use(currentUser);

// routes
app.use(createTicketRouter)
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);


app.all('*', async () => {
    throw new NotFoundError()
});

app.use(errorHandler);

export { app };