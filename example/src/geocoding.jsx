import React, { Component } from "react";
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { textFieldStyle } from './styles';


function render_geocode(geocode, key) {
    if (!geocode) {
        return undefined;
    }

    return (
        <ListItem
            disabled={true}
            primaryText={geocode.address}
            secondaryText={
                <div>
                <span>Location: ({geocode.x}, {geocode.y})</span>
                <br/>
                <span>Score: {geocode.score}</span>
                </div>
            }
            secondaryTextLines={2}
            key={key}
            className="geocode"
        >
    </ListItem>);
}


export default class Geocoding extends Component {
    constructor (props) {
        super(props);
        this.state = {
            error: {
                message: "",
            },
            errors: {
                address: "",
            },
            query: undefined,
            state: "waiting",
            provider: "mapbox",
            address: "1600 pennsylvania ave SE, washington, dc",
            geocodes: [],
        };
        // Ensure handle* methods have the right `this`
        this.handleProviderChange = this.handleProviderChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleProviderChange(event, index, selected) {
        var provider = event.target.value || selected;
        this.setState({
            provider: provider
        });
    }

    handleAddressChange(event) {
        var address = event.target.value;
        this.setState({
            address: address,
            errors: {
                address: address ? "" : "address required",
            }
        });

    }

    handleRequestClose() {
        this.setState({
            state: "waiting"
        });
    }

    handleSubmit(event) {
        // Don't cause whole page refresh on errors.
        event.preventDefault();

        console.log("geocoding: handleSubmit", this.state, this.props);
        let bcs = this.props.bcs;
        let address = this.state.address;
        let provider = this.state.provider;

        if (!bcs) {
            this.setState({
                state: "error",
                error: {
                    message: "ensure the bcs prop is passed to this component."
                }
            });
        }
        else if (!bcs.jwt&&!bcs.key) {
            this.setState({
                state: "error",
                error: {
                    message: "log in first."
                }
            });
        }
        else if (!address) {
            this.setState({
                state: "error",
                error: {
                    message: "need an address."
                }
            });
        }
        else {
            let promise = bcs.geocoding.geocode(address, provider);
            this.setState({
                state: "started",
                query: {
                    "provider": provider,
                    "address": address,
                }
            });
            promise.then((geocodes) => {
                console.log("geocoding: success", geocodes);
                this.setState({
                    state: "done",
                    message: (
                        `successfully retrieved ${geocodes.length} geocode(s).`
                    ),
                    geocodes: geocodes
                });

                // Just for playing around in the console, not for real apps
                window.geocodes = geocodes;
            })
            .catch((error) => {
                console.log("geocoding: failure", error);
                window.error = error;
                this.setState({
                    geocodes: [],
                    state: "error",
                    error: error
                });
            });
        }
    }

    render() {
        var query_repr = (
            this.state.geocodes.length > 0
            ? `"${this.state.query.address}"`
            : ""
        );
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

                    <label>
                        <SelectField
                            floatingLabelText="Provider"
                            value={this.state.provider}
                            onChange={this.handleProviderChange}
                        >
                            <MenuItem value="mapbox" primaryText="Mapbox" />
                            <MenuItem value="mapzen" primaryText="Mapzen" />
                        </SelectField>
                    </label>

                    <br/>

                    <label>
                        <TextField
                            type="text"
                            name="address"
                            style={textFieldStyle}
                            errorText={this.state.errors.address}
                            floatingLabelText="Address"
                            hintText="Address"
                            value={this.state.address}
                            onChange={this.handleAddressChange}
                        />
                    </label>

                    <br/>

                    <RaisedButton
                        primary={true}
                        type="submit"
                        label="Geocode"
                    />
                </form>

                <Snackbar
                    open={this.state.state === "started"}
                    message={"Geocoding..."}
                    autoHideDuration={4000}
                />

                <Snackbar
                    open={this.state.state === "done"}
                    message={`Retrieved ${this.state.geocodes.length} geocodes`}
                    onRequestClose={this.handleRequestClose}
                    autoHideDuration={4000}
                />

                <Snackbar
                    open={this.state.state === "error"}
                    message={`Error geocoding: ${this.state.error.message}`}
                    onRequestClose={this.handleRequestClose}
                    autoHideDuration={4000}
                />

            <div className="geocodes">
                {query_repr &&
                <Subheader>
                    Geocodes for {query_repr}
                </Subheader>
                }
                    <List>
                        {this.state.geocodes.map(render_geocode)}
                    </List>
                </div>
            </div>
        );
    }
}
