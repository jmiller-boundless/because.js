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
    constructor (
      public organization: string,
      public key: string,
      public roles: string[],
      public errorCode: number| undefined,
      public errorMessage: string| undefined
    ){

    }
}
export class UserRole{
  constructor (
    public id: number,
    public key: string,
    public description: string
  ){}
}
export class ApiKey {
    constructor (
      public id: number,
      public key: string,
      public created: number,
      public expires: number,
      public authorizedRoles: UserRole[],
      public parentOrganizationId: number,
      public errorCode: number| undefined,
      public errorMessage: string| undefined
    ){

    }
}

export class User{
  constructor(
    public id: number,
    public email: string,
    public roles: UserRole[],
    public created: number,
    public parentOrganizationId: number
  ){

  }
}

export class Organization{
  constructor(
    public id: number,
    public name: string,
    public created: number,
    public members: User[],
    public administrators: User[],
    public apiKeys: ApiKey[],
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

export function parse_ApiKey(response: Response): ApiKey{
  const data = parse_response<ApiKey>(response);
  const roles = [];
  for (const role_data of data.authorizedRoles) {
      const role = new UserRole(role_data.id,role_data.key,role_data.description);
      roles.push(role);
  }
  return new ApiKey(
    data.id,
    data.key,
    data.created,
    data.expires,
    roles,
    data.parentOrganizationId,
    data.errorCode,
    data.errorMessage
  );

}

export function parse_Organization(response: Response): Organization{
  const data = parse_response<Organization>(response);
  const members = [];
  for (const memberdata of data.members) {
      const memberroles = [];
      for(const memberrole of memberdata.roles){
        const role = new UserRole(memberrole.id,memberrole.key,memberrole.description);
        memberroles.push(role);
      }
      const member = new User(memberdata.id,memberdata.email,memberroles,memberdata.created,memberdata.parentOrganizationId);
      members.push(member);
  }

  const administrators = [];
  for (const administordata of data.administrators) {
      const adminroles = [];
      for(const adminrole of administordata.roles){
        const role = new UserRole(adminrole.id,adminrole.key,adminrole.description);
        adminroles.push(role);
      }
      const administrator = new User(administordata.id,administordata.email,adminroles,administordata.created,administordata.parentOrganizationId);
      administrators.push(administrator);
  }

  const apiKeys = [];
  for (const apikeydata of data.apiKeys){
    const roles = [];
    for (const role_data of apikeydata.authorizedRoles) {
        const role = new UserRole(role_data.id,role_data.key,role_data.description);
        roles.push(role);
    }
    const key = new ApiKey(
      apikeydata.id,apikeydata.key,apikeydata.created,apikeydata.expires,roles,apikeydata.parentOrganizationId,apikeydata.errorCode,apikeydata.errorMessage);
    apiKeys.push(key);
  }
  return new Organization(
    data.id,
    data.name,
    data.created,
    members,
    administrators,
    apiKeys,
    data.errorCode,
    data.errorMessage
  );

}
