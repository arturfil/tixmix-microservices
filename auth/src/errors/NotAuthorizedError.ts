import { CustomError } from "./customError";

export class NotAutorizedError extends CustomError {
    statusCode = 401;
    reason:string;
    constructor(str="Not Authorized") {
        super(str);
        this.reason = str;
        Object.setPrototypeOf(this, NotAutorizedError.prototype);
    }
    serializeErrors() {
        return [{message: this.reason}];
    }
        
}