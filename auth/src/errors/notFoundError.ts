import { CustomError } from "./customError";

export class NotFoundError extends CustomError {
    statusCode = 404;
    reason:string;
    constructor(str = "Route Not Found") {
        super(str)
        this.reason = str;
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors() {
        return [{message: this.reason}];
    }
}