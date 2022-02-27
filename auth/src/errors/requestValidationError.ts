import { ValidationError } from "express-validator";
import { CustomError } from "./customError";

export class RequestValidationError extends CustomError {
    statusCode = 400;
    reason:string;

    constructor(public errors: ValidationError[], str = 'Invalid Request Parameters') {
        super(str);    
        this.reason = str;
         Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param };
        })
    }
}
