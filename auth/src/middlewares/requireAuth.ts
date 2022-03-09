import { NextFunction, Request, Response } from "express";
import { NotAutorizedError } from "../errors/NotAuthorizedError";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        throw new NotAutorizedError();
    }

    next();
}