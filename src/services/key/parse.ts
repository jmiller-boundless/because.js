import { BecauseError } from "../../errors";
import { Response } from "../../response";
import { parse_response } from "../../parse";

/**
 * Structure of JSON body of key validate responses.
 *
 * See also:
 * https://github.com/boundlessgeo/bcs/blob/master/bcs-token-service
 * /src/main/java/com/boundlessgeo/bcs/data/BCSToken.java
 */
export class KeyValidateData {
    //organization: string;
    //key: string;
    //roles: string[];
    //errorCode: number | undefined;
    //errorMessage: string | undefined;

    constructor (
      public organization: string,
      public key: string,
      public roles: string[],
      public errorCode: number| undefined,
      public errorMessage: string| undefined
    ){

    }
}

export function parse_key_validate(response: Response): KeyValidateData {
    const data = parse_response<KeyValidateData>(response);
    // The envelope is irrelevant after we've checked for an error

        return new KeyValidateData(
          data.organization,
          data.key,
          data.roles,
          data.errorCode,
          data.errorMessage
        );

}
