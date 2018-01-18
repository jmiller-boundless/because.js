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
  ),
  "create_key": new Endpoint(
    "POST", "/auth/admin/create-apikey",
    undefined,
    new Headers({
        "Content-Type": "application/json",
    }),
    (args) => {
      return JSON.stringify({
        "organizationId":args.organizationId,
        "expireQuantity":args.expireQuantity,
        "expireUnit":args.expireUnit,
        "roles":args.roles.toString().split(',')
      });
    }
  ),
  "create_organization": new Endpoint(
    "POST", "/auth/admin/create-organization",
    undefined,
    new Headers({
        "Content-Type": "application/json",
    }),
    (args) => {
      return JSON.stringify({
        "name":args.name,
        "created":args.created
      });
    }
  ),
  "update_key": new Endpoint(
    "POST","/auth/admin/update-apikey",
    undefined,
    undefined,
    (args) =>{
      return JSON.stringify({
        "id":args.id,
        "expireQuantity":args.expireQuantity,
        "roles":args.roles.toString().split(','),
        "expireUnit":args.expireUnit
      });
    }
  ),
  "get_organizations": new Endpoint(
      "GET", "/auth/admin/get-organizations"
  ),
  "get_organization_byid": new Endpoint(
    "GET", "/auth/admin/get-organization-by-name/{name}"
  ),
  "delete_organization_byid": new Endpoint(
    "GET", "/auth/admin/delete-organization-by-id/{id}"
  ),
  "update_organization": new Endpoint(
    "POST", "/auth/admin/update-organization",
    undefined,
    undefined,
    (args) => {
      return JSON.stringify({
        "id":args.id,
        "name":args.name
      });
    }
  ),
  "get_roles": new Endpoint(
    "GET","/auth/admin/get-roles"
  )


}
