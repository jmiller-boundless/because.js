/**
 * Generic entry point for use from places other than the browser.
 *
 * This module is referenced by the `"main"` property in `package.json`.
 * It is also a convenient place to import high-level public API from.
 */

/** This line does nothing but make typedoc render the module comment. */

import { Frontend } from "./frontend";
import { Host, hosts } from "./hosts";
import { NodeClient as Client } from "./flavors/node_es5";

// The Because class "ships" with everything loaded on it
import { FrontendClass } from "./service_frontend";
import { TokenFrontend } from "./services/token/frontend";
import { KeyFrontend } from "./services/key/frontend";
import { RoutingFrontend } from "./services/routing/frontend";
import { BasemapFrontend } from "./services/basemap/frontend";
import { GeocodingFrontend } from "./services/geocoding/frontend";
import { SearchFrontend } from "./services/search/frontend";


/**
 * Top-level frontend implementation for Node.
 */
export class Because extends Frontend {
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
            "keys": KeyFrontend,
            "routing": RoutingFrontend,
            "geocode": GeocodingFrontend,
            "basemap": BasemapFrontend,
            "search": SearchFrontend,
        };
        super(classes, new Client(), host, debug);
    }
}
