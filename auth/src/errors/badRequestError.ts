import { CustomError } from "./customError";
import { DatabaseConnectionError } from "./databaseConnectionError";

export class BadRequestError extends CustomError {
    reason:string;
    statusCode = 400;
    constructor(str:string = 'Email already in use') {
        super(str);
        this.reason = str;
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErrors(){
        return [{message:  this.reason}]
    }
    
}