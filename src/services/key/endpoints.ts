import { Query } from "../../query";
import { Headers } from "../../headers";
import { Endpoint } from "../../service";

export const endpoints = {
  "validate_key": new Endpoint(
      "GET", "/auth/validate/key/{key}",
      (args) => {
          return new Query({
              "apikey": args.key.toString()
          });
      }
  )
}
