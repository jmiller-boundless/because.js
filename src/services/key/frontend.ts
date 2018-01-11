import { BecauseError } from "../../errors";
import { Host } from "../../host";
import { Username, Password } from "../../auth";
import { ServiceFrontend } from "../../service_frontend";
import { KeyService } from "./service";
import { Frontend } from "../../frontend";
import { parse_key_validate,parse_Organization,parse_Organizations,parse_roles } from "./parse";


/**
 * Error class that can be thrown when there was a problem logging in.
 */
export class LoginError extends BecauseError {
}


export class KeyFrontend extends ServiceFrontend {
    service: KeyService;

    constructor (frontend: Frontend, host: Host) {
        const service = new KeyService();
        super(service, frontend, host);
    }


    /**
     * Get a key and return it without other side effects.
     */
    async validate_key(key: string) {
        // If Javascript consumers pass null values, don't propagate them.
        if (!key) {
            throw new LoginError("key is required");
        }


        const endpoint = this.service.endpoint("validate_key");
        const request = endpoint.request(this.host.url, {
            "key": encodeURIComponent(key as string),
            "apikey":key
        });
        const response = await this.send(request);
        return parse_key_validate(response);
    }

    async get_organizations(){
      const endpoint = this.service.endpoint("get_organizations");
      const request = endpoint.request(this.host.url);
      const response = await this.send(request);
      return parse_Organizations(response);
    }

    async get_roles(){
      const endpoint = this.service.endpoint("get_roles");
      const request = endpoint.request(this.host.url);
      const response = await this.send(request);
      return parse_roles(response);
    }


}
