import React, { Component } from "react";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

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
              "ALL": "Any",
          },
          text: "geoserver",
          results: [],
      };
      // Ensure handle* methods have the right `this`
      this.handleTextChange = this.handleTextChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.updateOrganizations = this.updateOrganizations.bind(this);
      this.handleOrganizationChange = this.handleOrganizationChange.bind(this);
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
  }
  handleSubmit(event) {
      // Don't cause whole page refresh on errors.
      event.preventDefault();
  }

  updateOrganizations() {
      let bcs = this.props.bcs;
      let promise = bcs.keys.get_organizations();
      promise.then((result) => {
          const one = {};
          for (let record of result) {
            one[record.id] = record.name;
          }
          one["ALL"] = "Any";
          console.log("one: ", one);
          this.setState({
              organizations: one,
          });
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
    let organizationItems = createOrganizationItems(this.state.organizations);
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
          <label>
              <SelectField
                  floatingLabelText="Organization"
                  value={this.state.organization}
                  onChange={this.handleOrganizationChange}
              >
                {organizationItems}
              </SelectField>
          </label>
          <RaisedButton
              style={{
                  marginTop: "1em",
              }}
              primary={true}
              onClick={this.updateOrganizations}
              label="Get Organizations"
          />
      </form>
    </div>
    );
  }

}
