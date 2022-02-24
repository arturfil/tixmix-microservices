import express, { Request, Response, Router } from 'express';
const router:Router = express.Router();

router.get('/api/users/currentuser', (req: Request, res: Response) => {
    res.send("WOrks")
});

export {router as currentUserRouter};