import { BecauseError } from "../../errors";
import { Host } from "../../host";
import { Username, Password } from "../../auth";
import { ServiceFrontend } from "../../service_frontend";
import { KeyService } from "./service";
import { Frontend } from "../../frontend";
import { parse_key_validate,parse_Organization,parse_Organizations,parse_roles,parse_wrapped_key,parse_wrapped_organization } from "./parse";


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

    async create_key(orgid: string,expirequantity: number,expireunit: string,roles: string){
      const endpoint = this.service.endpoint("create_key");
      const request = endpoint.request(this.host.url,{
        "organizationId":orgid,
        "expireQuantity":expirequantity,
        "expireUnit":expireunit,
        "roles":roles
      });

      const response = await this.send(request);
      return parse_wrapped_key(response);

    }

    async create_organization(name: string){
      const endpoint = this.service.endpoint("create_organization");
      const d = new Date();
      const request = endpoint.request(this.host.url,{
        "name":name,
        "created":d.getTime()*1000000
      });

      const response = await this.send(request);
      return parse_wrapped_organization(response);

    }

    async update_key(id: string,expirequantity: number,expireunit: string,roles: string){
      const endpoint = this.service.endpoint("update_key");
      const request = endpoint.request(this.host.url,{
        "id":id,
        "expireQuantity":expirequantity,
        "expireUnit":expireunit,
        "roles":roles
      });

      const response = await this.send(request);
      return parse_wrapped_key(response);
    }


}
