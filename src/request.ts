/**
 * Utilities for working with HTTP request data.
 */

/** This line does nothing but make typedoc render the module comment. */

import { InvalidObject } from "./errors";
import { Query } from "./query";
import { Headers, HeaderData } from "./headers";
import { Method, URL, Body } from "./http";


// TODO: maybe do a RequestData and have Request unpack from that, then I can
// verify on keywords instead of ordered-ugh


/**
 * Interchange format for data in HTTP request headers.
 */
export class RequestHeaderData extends HeaderData {
}


export class InvalidRequest extends InvalidObject {
    readonly name: string = "InvalidRequest";
    readonly message: string;
}


/**
 * Bundle of parameters for an HTTP request.
 *
 * This class represents "abstract requests," intentionally excluding
 * anything pertaining to the actual performance of the described request, the
 * progress of that request, or anything about the resulting response.
 *
 * It is basically an annotated tuple which can generate a URL for you, and
 * associate it with headers and body to be sent.
 *
 */
export class Request {
    readonly method: Method;
    _url: URL;
    readonly body: Body;
    query: Query;
    headers: Headers;

    // timeout is intentionally excluded, it's a performance issue
    // for Client/Transfer.

    constructor (
        // HTTP method
        method: Method,
        // URL for request, not including querystring
        url: URL,
        // Query parameters: mapping of names to string values
        query?: Query,
        // bytes to send in body
        body?: Body,
        // Headers: mapping of names to string values
        headers?: Headers,
    ) {
        this.method = method;
        if (url.indexOf("?") > -1) {
            throw new InvalidRequest(
                "argument for url parameter must not include ?",
            );
        }
        this._url = url as URL;
        this.query = query || new Query();
        this.headers = headers || new Headers();
        this.body = body || "" as Body;
    }

    equals(request: Request): boolean {
        return (
            request.method === this.method
            && request.url === this.url
            && request.body === this.body
            && request.query.equals(this.query)
            && request.headers.equals(this.headers)
        );
    }

    copy(): Request {
        return new Request(
            this.method,
            this._url,
            // query: immutable
            this.query,
            this.body,
            // headers: mutable
            this.headers ? this.headers.copy() : this.headers,
        );
    }

    get url(): string {
        let result: string;
        const query_string = this.query.encoded;
        if (query_string) {
            result = `${this._url}?${query_string}`;
        }
        else {
            result = this._url as string;
        }
        return result;
    }
}
