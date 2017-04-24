/**
 * Entry point to be used in the browser.
 *
 * This module is referenced by the `"browser"` property in `package.json`.
 */

/** This line does nothing but make typedoc render the module comment. */

import { Request } from "./request";
import { Headers } from "./headers";
import { Query } from "./query";
import { Frontend } from "./frontend";
import { Host, hosts } from "./hosts";

// The Because class "ships" with everything loaded on it
import { FrontendClass } from "./service_frontend";
import { TokenFrontend } from "./services/token/frontend";
import { RoutingFrontend } from "./services/routing/frontend";
import { BasemapFrontend } from "./services/basemap/frontend";
import { GeocodingFrontend } from "./services/geocoding/frontend";

import {
    BrowserClient as Client,
    BrowserTransfer as Transfer,
} from "./flavors/browser_es5";


class Because extends Frontend {
    constructor (env?: string, debug?: boolean) {
        env = env || "test";
        const host: Host = hosts[env];
        if (!host) {
            throw new Error(`unknown environment '${env}'`);
        }
        if (!host.url) {
            throw new Error(`bad host for '${env}'`);
        }
        const classes: {[name: string]: FrontendClass} = {
            "tokens": TokenFrontend,
            "routing": RoutingFrontend,
            "geocode": GeocodingFrontend,
            "basemap": BasemapFrontend,
        };
        super(classes, new Client(), host, debug);
    }
}


export {
    Client,
    Request,
    Headers,
    Query,
    Because,
};
