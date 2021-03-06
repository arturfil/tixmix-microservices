import express, { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { UserModel } from '../models/User';
import jwt from 'jsonwebtoken';
import { BadRequestError, validateRequest } from '@tixmix/common';

const router:Router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({min: 4, max: 20}).withMessage("Min 4 chars, max 20 chars")
], 
validateRequest,
async (req: Request, res: Response) => {
    const { email, password } = req.body
    const exisitingUser = await UserModel.findOne({email});
    if (exisitingUser) {
        throw new BadRequestError();   
    }
    const user = new UserModel(req.body);
    await user.save();
    // generate jwt
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);
    // store it on session object
    req.session = {
        jwt: userJwt
    };
    return res.status(201).send(user);
});

export {router as signUpRouter};