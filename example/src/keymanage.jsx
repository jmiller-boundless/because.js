import React, { Component } from "react";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {List,ListItem} from 'material-ui/List';
import Moment from 'moment';

function dedupe(items) {
    var seen = {};
    var result = [];
    for (let item of items) {
        if (!seen[item.description]) {
            result.push(item);
        }
        seen[item.description] = true;
    }
    return result;
}

function renderOrgMetadata(orgs) {
    console.log("orgs",orgs);
    if (!orgs||orgs.length<1) {
        return undefined;
    }
    let org = orgs[0];
    return (
        <ListItem
            disabled={true}
            primaryText={
            <div>
                <span>
                    Organization: {org.name}
                </span>
                <br/>
                <span>Created: {Moment.unix(org.created/1000).format('dddd, MMMM Do, YYYY h:mm:ss A')}</span>
                <br/>
                <span>Id: {org.id}</span>
            </div>
            }
            key={org.id}
            className="result"
        >
        </ListItem>
    );
}

function renderKeyMetadata(keys) {
    console.log("keys",keys);
    if (!keys||keys.length<1) {
        return undefined;
    }
    let key = keys[0];
    let roleList = dedupe(key.authorizedRoles).map(
        (role) => {
            return <ListItem
                disabled={true}
                key={role.description}
            >
                {role.description}
            </ListItem>;
        }
    );
    console.log("rolelist",roleList);
    return (
        <ListItem
            disabled={true}
            primaryText={
            <div>
                <span>
                    Key: {key.key}
                </span>
                <br/>
                <span>Id: {key.id}</span>
                <br/>
                <span>Created: {Moment.unix(key.created/1000).format('dddd, MMMM Do, YYYY h:mm:ss A')}</span>
                <br/>
                <span>Expires: {Moment.unix(key.expires/1000).format('dddd, MMMM Do, YYYY h:mm:ss A')}</span>
                <br/>
                <span>Roles: {roleList}</span>
            </div>
            }
            key={key.key}
            className="result"
        >
        </ListItem>

    );
}

export default class KeyManage extends Component {
  constructor (props) {
      super(props);
      this.state = {
          error:  {
              message: "",
          },
          errors: {
              text: "",
          },
          query: undefined,
          state: "waiting",
          organization: "ALL",
          organizations: {
              "ALL": "ALL",
          },
          apikey: "",
          apikeys: {
            "ALL": "ALL"
          },
          keydata: [],
          organizationdata:[],
          text: "geoserver",
          results: [],
          multiroles: [],
          rolesItems: []
      };
      // Ensure handle* methods have the right `this`
      this.handleTextChange = this.handleTextChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.updateOrganizations = this.updateOrganizations.bind(this);
      this.handleOrganizationChange = this.handleOrganizationChange.bind(this);
      this.handleApiKeyChange = this.handleApiKeyChange.bind(this);
      this.updateApiKeys = this.updateApiKeys.bind(this);
      this.createApiKey = this.createApiKey.bind(this);
      this.handleRolesChange = this.handleRolesChange.bind(this);
      this.updateRoles = this.updateRoles.bind(this);
  }

  createApiKey(){
    console.log("creating key function");
  }

  handleTextChange(event) {
      var text = event.target.value;
      this.setState({
          text: text,
          errors: {
              text: text ? "" : "text required",
          }
      });
  }
  handleOrganizationChange(event, index, selected) {
      this.setState({
          organization: selected
      });
      this.updateApiKeys(selected);
      this.updateRoles();
  }
  handleApiKeyChange(event, index, selected) {
      this.setState({
          apikey: selected
      });
  }
  handleRolesChange(event, index, selected){
    this.setState({
      multiroles: selected
    });
    console.log("multiroles",this.state.multiroles);
  }
  handleSubmit(event) {
      // Don't cause whole page refresh on errors.
      event.preventDefault();
  }

  updateRoles(){
    let bcs = this.props.bcs;
    let promise = bcs.keys.get_roles();
    promise.then((result) => {
      const one = {};
      for (let record of result) {
        one[record.id] = record.description;
      }
      this.setState({
          rolesItems: one,
      });
    });
  }

  updateOrganizations() {
      let bcs = this.props.bcs;
      let promise = bcs.keys.get_organizations();
      let keyhldr = [];
      promise.then((result) => {
          const one = {};
          for (let record of result) {
            one[record.id] = record.name;
            keyhldr.push(...record.apiKeys)
          }
          one["ALL"] = "Any";
          console.log("one: ", one);
          this.setState({
              organizations: one,
              keydata: keyhldr,
              organizationdata: result
          });
      });
  }
  updateApiKeys(organizationid){
    let orgkeys = this.state.keydata.filter(key => key.parentOrganizationId.toString()===organizationid);
    const one = {};
    for (let orgkey of orgkeys){
      one[orgkey.id] = orgkey.key;
    }
    this.setState({
      apikeys: one
    });
    console.log("state.apikeys",orgkeys);
  }

  render() {

  function createOrganizationItems(organizations) {
      let organization_options = [];
      let organization_keys = Object.keys(organizations);
      for (let key of organization_keys) {
          let value = organizations[key];
          let item = (
              <MenuItem
                  key={key}
                  value={key}
                  primaryText={value} />
          );
          organization_options.push(item);
      }
      return organization_options;
  }

  function createKeyItems(apikeys) {
      let key_options = [];
      let key_keys = Object.keys(apikeys);
      for (let key of key_keys) {
          let value = apikeys[key];
          let item = (
              <MenuItem
                  key={key}
                  value={key}
                  primaryText={value} />
          );
          key_options.push(item);
      }
      return key_options;
  }
    let organizationItems = createOrganizationItems(this.state.organizations);
    let apikeyItems = createKeyItems(this.state.apikeys);
    let rolesItems = createKeyItems(this.state.rolesItems);
    return (
    <div style={{
        display: "flex",
        flexDirection: "row",
    }}>
      <form onSubmit={this.handleSubmit} style={{
          display: "flex",
          flexDirection: "column",
      }}>

          {this.props.message &&
              <div className="message">
                 {this.props.message}
              </div>
          }

          <br/>
          <RaisedButton
              style={{
                  marginTop: "1em",
              }}
              primary={true}
              onClick={this.updateOrganizations}
              label="Get Organizations"
          />
          <label>
              <SelectField
                  floatingLabelText="Organization"
                  value={this.state.organization}
                  onChange={this.handleOrganizationChange}
              >
                {organizationItems}
              </SelectField>
          </label>

          <label>
              <SelectField
                  floatingLabelText="API Key"
                  value={this.state.apikey}
                  onChange={this.handleApiKeyChange}
              >
                {apikeyItems}
              </SelectField>
          </label>
          <label>
              <SelectField
                  multiple={true}
                  floatingLabelText="Roles"
                  value={this.state.multiroles}
                  onChange={this.handleRolesChange}
              >
                {rolesItems}
              </SelectField>
          </label>
          <RaisedButton
              style={{
                  marginTop: "1em",
              }}
              primary={true}
              onClick={this.createApiKey}
              label="Create New API Key"
          />
      </form>
      <div className="results">
        <List>
            {renderOrgMetadata(this.state.organizationdata.filter(org => org.id.toString()===this.state.organization))}
            {renderKeyMetadata(this.state.keydata.filter(key => key.id.toString()===this.state.apikey))}
        </List>
      </div>

    </div>
    );
  }

}
