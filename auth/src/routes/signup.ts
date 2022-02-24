import express, { Request, Response, Router } from 'express';
const router:Router = express.Router();

router.post('/api/users/signup', (req: Request, res: Response) => {
    res.send("Sign Up")
});

export {router as signUpRouter};