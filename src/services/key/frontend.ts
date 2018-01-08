import { BecauseError } from "../../errors";
import { Host } from "../../host";
import { Username, Password } from "../../auth";
import { ServiceFrontend } from "../../service_frontend";
import { KeyService } from "./service";
import { Frontend } from "../../frontend";


/**
 * Error class that can be thrown when there was a problem logging in.
 */
export class LoginError extends BecauseError {
}


export class KeyFrontend extends ServiceFrontend {
    service: KeyService;



}
