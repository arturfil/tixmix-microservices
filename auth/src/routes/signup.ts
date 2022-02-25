import express, { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';

const router:Router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({min: 4, max: 20}).withMessage("Min 4 chars, max 20 chars")
], 
(req: Request, res: Response) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        throw new Error('Invalid email or password')
    } 

    const { email, password } = req.body;
    
    console.log("Creating a user...");
    throw new Error('Error connection to db')
    
    res.send({});
});

export {router as signUpRouter};