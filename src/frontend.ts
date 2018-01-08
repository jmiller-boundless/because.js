// General utilities
import { pairs } from "./data";
import { Log } from "./log";

// Base
import { InvalidObject } from "./errors";

// HTTP request/response processing
import { Host } from "./host";
import { Method, URI, Body } from "./http";
import { Username, Password } from "./auth";
import { Request } from "./request";
import { Query } from "./query";
import { Headers } from "./headers";
import { Client } from "./client";
import { Transfer } from "./transfer";
import { ServiceFrontend } from "./service_frontend";

// Token service or key service to login
import { JWT } from "./services/token/jwt";
import { TokenFrontend } from "./services/token/frontend";
import { KeyValidateData } from "./services/key/parse";
import { KeyFrontend } from "./services/key/frontend";

// We may also use other services
import { FrontendClass } from "./service_frontend";
import { RoutingFrontend } from "./services/routing/frontend";
import { BasemapFrontend } from "./services/basemap/frontend";
import { GeocodingFrontend } from "./services/geocoding/frontend";
import { SearchFrontend } from "./services/search/frontend";


/**
 * Base for top-level facade objects to give API users a friendly entry point.
 */
export class Frontend {
    /**
     * jwt is either undefined in the case that there has not been a login, or
     * it is a JWT instance representing the result.
     *
     * This is publicly exposed from the Frontend so that users don't have to
     * directly handle results from login() to know whether they are logged in,
     * what roles they have, etc. So many use cases are liable to need access
     * to this that it shouldn't require much effort from the user to get it.
     */
    public jwt: JWT | undefined;

    /**
    * Added as an alternative to JWT logins.
    */
    public key: KeyValidateData | undefined;

    /**
     * Log instance used internally by the Frontend instance.
     */
    protected log: Log;

    /**
     * Implements the token service wrapper.
     */
    tokens: TokenFrontend;

    /**
     * Implements the key service wrapper.
     */
    keys: KeyFrontend;

    /**
     * Implements the basemap service wrapper.
     *
     * Should be undefined if this service is not going to be used.
     */
    basemaps?: BasemapFrontend;

    /**
     * Implements the geocoding service wrapper.
     *
     * Should be undefined if this service is not going to be used.
     */
    geocoding?: GeocodingFrontend;

    /**
     * Implements the routing service wrapper.
     *
     * Should be undefined if this service is not going to be used.
     */
    routing?: RoutingFrontend;

    /**
     * Implements the search service wrapper.
     *
     * Should be undefined if this service is not going to be used.
     */
    search?: SearchFrontend;

    /**
     * Headers to be added to every outgoing request from the Frontend.
     *
     * Particular instances of Frontend may override this.
     */
    default_headers = new Headers({
        "Accept": "application/json",
        "X-Api-Version": "0.1",
    });

    constructor (
        public classes: {[name: string]: FrontendClass},
        private client: Client,
        public host: Host,
        public debug?: boolean,
    ) {
        if (!classes) {
            throw new InvalidObject(
                "must pass an object mapping frontend classes",
            );
        }
        if (!client) {
            throw new InvalidObject(
                "must pass a client",
            );
        }
        if (!host || !(host instanceof Host)) {
            throw new InvalidObject(
                "must pass a Host instance",
            );
        }
        this.client = client;
        this.host = host;
        this.debug = debug || false;
        this.jwt = undefined;
        this.key = undefined;
        this.log = new Log("because");

        // Always get a TokenFrontend so we can log in
        this.tokens = new TokenFrontend(this, host);

        this.keys = new KeyFrontend(this,host);

        // Use the passed ServiceFrontends
        this.add_service_frontends(classes);
    }

    private add_service_frontends(classes: {[name: string]: FrontendClass}) {
        for (const pair of pairs(classes)) {
            // const name: string = pair[0];
            const cls: FrontendClass = pair[1];
            const frontend = new cls(this, this.host);
            this.add_service_frontend(frontend);
        }
    }

    private add_service_frontend(frontend: ServiceFrontend) {
        // TODO: has to be a better way
        if (frontend instanceof TokenFrontend) {
            this.tokens = frontend;
        }
        else if(frontend instanceof KeyFrontend){
          this.keys = frontend;
        }
        else if (frontend instanceof BasemapFrontend) {
            this.basemaps = frontend;
        }
        else if (frontend instanceof GeocodingFrontend) {
            this.geocoding = frontend;
        }
        else if (frontend instanceof RoutingFrontend) {
            this.routing = frontend;
        }
        else if (frontend instanceof SearchFrontend) {
            this.search = frontend;
        }
    }

    /**
     * Construct a request with the appropriate User-Agent and Auth headers.
     */
    request(
        // HTTP method
        method: Method,
        // HTTP relative URI
        uri: URI,
        // URL query parameters
        query?: Query,
        // Request body data
        body?: Body,
        // HTTP request headers
        headers?: Headers,
    ): Request {
        headers = this.enriched_headers(headers);
        query = this.enriched_query(query);
        const url = `${this.host.url}/${uri}`;
        return new Request(method, url, query, body, headers);
    }

    private enriched_headers(headers?: Headers): Headers {
        const enriched: Headers = (
            headers
            ? headers.updated(this.default_headers)
            : this.default_headers.copy()
        );
        if (this.jwt) {
            enriched.set("Authorization", `Bearer ${this.jwt.token}`);
        }
        return enriched;

    }

    private enriched_query(query?: Query){
      const enriched: Query = (
        query
        ? query
        : new Query()
      );
      if(this.key){
        enriched.set("apikey",this.key.key);
      }
      return enriched;
    }

    /**
     * Get a token and cache it on this instance for reuse.
     *
     * This should normally be preferred to ensure that tokens are locally
     * cached, avoid redundant HTTP requests, and provide better ease-of-use.
     */
    async login(username?: Username, password?: Password, key?: string) {
        const frontend: TokenFrontend | undefined = this.tokens;
        const keyfrontend: KeyFrontend | undefined = this.keys;
        let jwt: JWT | undefined;
        let keyval: KeyValidateData | undefined;
        if(username!=undefined&&password!=undefined){
          if (frontend) {
              jwt = await frontend.get_token(username, password);
              this.jwt = jwt;
          }
          else {
              this.log.error("cannot login without token service loaded");
          }
          return jwt;
        }else if(key!=undefined){
          keyval = await keyfrontend.validate_key(key);
          this.log.debug("keyval",keyval);
          this.key = keyval;
          return keyval;
        }else{
          this.log.error("Login requires either username and password or a key");
        }
    }

    /**
     * Encapsulate this.client.send.
     *
     * If other methods use this method instead of directly calling
     * this.client.send, then this instance can uniformly enforce policy around
     * requests, like logging and 403 handling.
     */
    send(request: Request): Transfer {
        const headers = this.enriched_headers(request.headers);
        const query = this.enriched_query(request.query);
        // TODO
        request.headers = headers;
        request.query = query;
        this.log.debug("about to send", {"enriched query": query});
        this.log.debug("about to send", {"request": request});
        const transfer = this.client.send(request);
        return transfer;
    }

}
