import express, { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/badRequestError';
import { validateRequest } from '../middlewares/validateRequest';
import { UserModel } from '../models/User';
import { Password } from '../services/Password';
import jwt from 'jsonwebtoken';
const router:Router = express.Router();

router.post('/api/users/signin', [
    body('email').isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('All fields are required')
], validateRequest, async (req: Request, res: Response) => {
    const {email, password } = req.body;
    const existingUser = await UserModel.findOne({email});
    if (!existingUser) {
        throw new BadRequestError('Invalid Credentials');
    }
    const passwordsMatch = await Password.compare(existingUser.password, password);
    if (!passwordsMatch) throw new BadRequestError("Invalid Credentials");
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!);
    req.session = {
        jwt: userJwt
    }
    res.status(200).json(existingUser);
});

export {router as signInRouter};