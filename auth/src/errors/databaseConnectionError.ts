import { CustomError } from "./customError";

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason:string;

    constructor(str = 'Invalid request parameter') {
        super(str);
        this.reason = str;
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [{message: this.reason}]
    }
}

class Test {
    
}