import React, { Component } from "react";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {List,ListItem} from 'material-ui/List';
import Moment from 'moment';
import NumberInput from 'material-ui-number-input';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { textFieldStyle } from './styles';

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
          rolesItems: [],
          expireunit:"",
          expirequant:"1",
          organizationname:"",
          keyexpire:{}
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
      this.handleExpireUnitChange = this.handleExpireUnitChange.bind(this);
      this.handleExpireQuantChange = this.handleExpireQuantChange.bind(this);
      this.onError = this.onError.bind(this);
      this.createOrganization = this.createOrganization.bind(this);
      this.handleOrgNameChange = this.handleOrgNameChange.bind(this);
      this.handleExpireDateChange = this.handleExpireDateChange.bind(this);
      this.editApiKey = this.editApiKey.bind(this);
  }

  onError = (error) => {
    let errorText;
    console.log(error);
    switch (error) {
      case 'required':
        errorText = 'This field is required';
        break;
      case 'invalidSymbol':
        errorText = 'You are tring to enter none number symbol';
        break;
      case 'incompleteNumber':
        errorText = 'Number is incomplete';
        break;
      case 'singleMinus':
        errorText = 'Minus can be use only for negativity';
        break;
      case 'singleFloatingPoint':
        errorText = 'There is already a floating point';
        break;
      case 'singleZero':
        errorText = 'Floating point is expected';
        break;
      case 'min':
        errorText = 'You are tring to enter number less than 1';
        break;
      case 'max':
          errorText = 'You are tring to enter number greater than 100';
          break;
      default:
          errorText='';
          break;
      }
      this.setState({ error:{message: errorText }});
    };

  createApiKey(){
    console.log("creating key function");
    const orgid = this.state.organization;
    const expirequantity = this.state.expirequant;
    const expireunit = this.state.expireunit;
    const roles = this.state.multiroles.join();
    let that = this;
    let bcs = this.props.bcs;
    let promise = bcs.keys.create_key(orgid,parseInt(expirequantity,10),expireunit,roles);
    promise.then((result) => {
      console.log("key create result",result);
      if(!result.errorCode&&!result.errorMessage&&result.key){
        that.updateOrganizations();
        that.setState({
          organization:result.parentOrganizationId.toString(),
          apikey:result.id.toString()
        });
      }
    });
  }

  editApiKey(){
    console.log("editing key function");
    const keyid = this.state.apikey;
    const expirequantity = this.state.expirequant;
    const expireunit = this.state.expireunit;
    const roles = this.state.multiroles.join();
    let that = this;
    let bcs = this.props.bcs;
    let promise = bcs.keys.update_key(keyid,parseInt(expirequantity,10),expireunit,roles);
    promise.then((result) => {
      console.log("key create result",result);
      if(!result.errorCode&&!result.errorMessage&&result.key){
        that.updateOrganizations();
        that.setState({
          organization:result.parentOrganizationId.toString(),
          apikey:result.id.toString()
        });
      }
    });
  }

  createOrganization(){
    console.log("creating organization function");
    const name = this.state.organizationname;
    let that = this;
    let bcs = this.props.bcs;
    let promise = bcs.keys.create_organization(name);
    promise.then((result) => {
      console.log("organization create result",result);
      if(!result.errorCode&&!result.errorMessage&&result.id){
        that.updateOrganizations();
        that.setState({
          organization:result.id.toString()
        });
      }
    });
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
          organization: selected,
          apikey: ""
      });
      this.updateApiKeys(selected);
      this.updateRoles();
  }
  daysBetween(date1, date2){
      //Get 1 day in milliseconds
    var one_day=1000*60*60*24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms/one_day);
  }
  handleApiKeyChange(event, index, selected) {
      console.log("hakc selected",selected);
      const keysel = this.state.keydata.filter(key => key.id.toString()===selected);
      const keyroles = keysel[0].authorizedRoles.map(ar=>{
        return ar.key;
      });
      const expiredate = new Date(keysel[0].expires);
      const expirequant = this.daysBetween(new Date(),expiredate).toString();
      this.setState({
          apikey: selected,
          multiroles: keyroles,
          keyexpire: expiredate,
          expireunit: "DAY",
          expirequant: expirequant
      });
  }
  handleExpireUnitChange(event, index, selected) {
      this.setState({
          expireunit: selected
      });
  }
  handleExpireQuantChange(event) {
    var text = event.target.value;
    console.log("expirequant",text);
      this.setState({
          expirequant: text
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

  handleExpireDateChange(event,date){
    const expirequant = this.daysBetween(new Date(),date).toString();
    this.setState({
      keyexpire:date,
      expireunit: "DAY",
      expirequant: expirequant
    });
  }

  updateRoles(){
    let bcs = this.props.bcs;
    let promise = bcs.keys.get_roles();
    promise.then((result) => {
      const one = {};
      for (let record of result) {
        one[record.key] = record.description;
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
      let that = this;
      promise.then((result) => {
          console.log("updateorg result",result);
          const one = {};
          for (let record of result) {
            one[record.id] = record.name;
            console.log("record.apikeys",record.apiKeys);
            keyhldr.push(...record.apiKeys);
          }
          one["ALL"] = "Any";
          console.log("one: ", one);
          console.log("keyhldr",keyhldr);
          this.setState({
              organizations: one,
              keydata: keyhldr,
              organizationdata: result
          });
          console.log("before updateapikeys call");
          that.updateApiKeys(this.state.organization);
          console.log("after updateapikeys call");
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
    console.log("state.apikeys",one);
  }

  handleOrgNameChange(event) {
      let name = event.target.value;
      this.setState({
          organizationname: name
      });
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
  function createExpireUnitItems(expireunits) {
      let key_options = [];
      for (let key of expireunits) {
          let item = (
              <MenuItem
                  key={key}
                  value={key}
                  primaryText={key} />
          );
          key_options.push(item);
      }
      return key_options;
  }
    let organizationItems = createOrganizationItems(this.state.organizations);
    let apikeyItems = createKeyItems(this.state.apikeys);
    let rolesItems = createKeyItems(this.state.rolesItems);
    let expireunits = createExpireUnitItems(["DAY", "WEEK", "MONTH", "YEAR"]);
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
          <label>
              <SelectField
                  floatingLabelText="Expire Unit"
                  value={this.state.expireunit}
                  onChange={this.handleExpireUnitChange}
              >
                {expireunits}
              </SelectField>
          </label>
          <label htmlFor="expirequant">
          <NumberInput
                  id="expirequant"
                  value={this.state.expirequant}
                  min={1}
                  max={10000}
                  strategy="warn"
                  onError={this.onError}
                  errorText={this.state.error.message}
                  onChange={this.handleExpireQuantChange}
           />
                  Expire Quantity
          </label>
          <DatePicker
            autoOk={this.state.autoOk}
            floatingLabelText="Expire Date"
            value={this.state.keyexpire}
            onChange={this.handleExpireDateChange}
          />
          <RaisedButton
              style={{
                  marginTop: "1em",
              }}
              primary={true}
              onClick={this.createApiKey}
              label="Create New API Key"
          />
          <RaisedButton
              style={{
                  marginTop: "1em",
              }}
              primary={true}
              onClick={this.editApiKey}
              label="Submit Edits To API Key"
          />
          <label>
              <TextField
                  type="text"
                  name="neworg"
                  style={textFieldStyle}
                  errorText={this.state.errors.neworg}
                  floatingLabelText="New Organization Name"
                  value={this.state.organizationname}
                  onChange={this.handleOrgNameChange}
              />
          </label>
          <RaisedButton
              style={{
                  marginTop: "1em",
              }}
              primary={true}
              onClick={this.createOrganization}
              label="Create New Organization"
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
