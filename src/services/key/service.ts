import { Service } from "../../service";
import { endpoints } from "./endpoints";


/**
 * HTTP interface definition for the token service.
 */
export class KeyService extends Service {

    constructor () {
        super(endpoints);
    }

    parse(response: Response) {
    }
}
