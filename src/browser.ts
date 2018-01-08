/**
 * Entry point to be used in the browser.
 *
 * This module is referenced by the `"browser"` property in `package.json`.
 * This hint may be used by tools like browserify, webpack and jspm.
 * For more information about how some tools may use this property, see
 * https://github.com/defunctzombie/package-browser-field-spec.
 */

/** This line does nothing but make typedoc render the module comment. */

import { Frontend } from "./frontend";
import { Host, hosts } from "./hosts";
import { BrowserClient as Client } from "./flavors/browser_es5";

// The Because class "ships" with everything loaded on it
import { FrontendClass } from "./service_frontend";
import { TokenFrontend } from "./services/token/frontend";
import { KeyFrontend } from "./services/key/frontend";
import { RoutingFrontend } from "./services/routing/frontend";
import { BasemapFrontend } from "./services/basemap/frontend";
import { GeocodingFrontend } from "./services/geocoding/frontend";
import { SearchFrontend } from "./services/search/frontend";


/**
 * Top-level frontend implementation for the browser.
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
