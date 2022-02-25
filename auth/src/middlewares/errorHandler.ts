import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/requestValidationError";
import { DatabaseConnectionError } from "../errors/databaseConnectionError";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof RequestValidationError)
        console.log("Request Error");

    if (err instanceof DatabaseConnectionError)
        console.log("Database Error");
        
    res.status(400).send({
        message: err.message
    });
};
