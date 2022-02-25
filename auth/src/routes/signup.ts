import express, { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/requestValidationError';
import { DatabaseConnectionError } from '../errors/databaseConnectionError';

const router:Router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({min: 4, max: 20}).withMessage("Min 4 chars, max 20 chars")
], 
(req: Request, res: Response) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    } 

    const { email, password } = req.body;
    
    console.log("Creating a user...");
    throw new DatabaseConnectionError();
    
    res.send({});
});

export {router as signUpRouter};