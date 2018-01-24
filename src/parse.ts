import { BecauseError } from "./errors";
import { Response } from "./response";


class ParseError extends BecauseError {
    readonly name: string = "ParseError";

    constructor (
        message: string,
        public response: Response,
        public code?: number,
        text?: string,
    ) {
        super(message, text || message);
        this.response = response;
        this.code = code;
    }
}


/*
 * Define the structure returned by BCS APIs to encode errors.
 * Ignores other properties.
 */
class MayHaveError {
    errorCode: number | undefined;
    errorMessage: string | undefined;
}


/**
 * Standard gauntlet of checks and conversions for any of the services
 *
 * T is the type of object that should be returned. Here, it's not checked at
 * runtime, so all that really does is propagate as the type tag of the return
 * value. It's not much different from just using `any`.
 */
export function parse_response<T extends MayHaveError>(response: Response): T {
    if (!response) {
        throw new Error("no response");
    }
    if (!response.body) {
        console.log("response no body", response);
        throw new Error("response has no body");
    }
    if (response.status < 200 || response.status > 299) {
        const message = `error response: ${response.status}`;
        throw new Error(message);
    }
    const data = JSON.parse(response.body);
    if (data.errorCode || data.errorMessage) {
        const code = data.errorCode;
        const message = data.errorMessage;
        throw new ParseError(
            `error body in response: code ${code}: ${message}`,
            response,
            code,
            message,
        );
    }
    return data;
}


// bleh
export function parse_array<T>(response: Response): T[] {
    if (!response) {
        throw new Error("no response");
    }
    if (!response.body) {
        throw new Error("response has no body");
    }
    if (response.status < 200 || response.status > 299) {
        const message = `error response: ${response.status}`;
        throw new Error(message);
    }
    const data = JSON.parse(response.body);
    return data;
}
