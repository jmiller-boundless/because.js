import React, { Component } from "react";
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { textFieldStyle } from './styles';


function renderGeocode(geocode, key) {
    if (!geocode) {
        return undefined;
    }

    return (
        <ListItem
            disabled={true}
            primaryText={<span>Location: ({geocode.x}, {geocode.y})</span>}
            secondaryText={
                <div>
                    <span>Address: {geocode.address}</span>
                    <br/>
                    <span>Score: {geocode.score}</span>
                </div>
            }
            secondaryTextLines={2}
            key={key}
            className="geocode"
        >
        </ListItem>
    );
}


export default class ReverseGeocoding extends Component {
    constructor (props) {
        super(props);
        this.state = {
            errors: {
                lat: "",
                lon: "",
            },
            state: "waiting",
            lat: "0.0",
            lon: "0.0",
            query: undefined,
            provider: "mapzen",
            geocodes: [],
        };
        // Ensure handle* methods have the right `this`
        this.handleProviderChange = this.handleProviderChange.bind(this);
        this.handleLatChange = this.handleLatChange.bind(this);
        this.handleLonChange = this.handleLonChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleProviderChange(event, bleh, blargh) {
        var provider = event.target.value || blargh;
        this.setState({
            provider: provider
        });
    }

    handleLatChange(event) {
        this.setState({lat: event.target.value});
    }

    handleLonChange(event) {
        this.setState({lon: event.target.value});
    }

    handleSubmit(event) {
        // Don't cause whole page refresh on errors.
        event.preventDefault();

        console.log("reverse geocoding: handleSubmit", this.state, this.props);
        let bcs = this.props.bcs;
        let lat = this.state.lat;
        let lon = this.state.lon;
        let provider = this.state.provider;

        if (!bcs) {
            this.setState({
                state: "error",
                message: "ensure the bcs prop is passed to this component."
            });
        }
        else if (!bcs.jwt) {
            this.setState({message: "log in first."});
        }
        else {
            let promise = bcs.geocoding.reverse_geocode([lat, lon], provider);
            this.setState({
                state: "started",
                query: {
                    "provider": provider,
                    "lat": lat,
                    "lon": lon,
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
                window.reverse_geocodes = geocodes;
            })
            .catch((error) => {
                console.log("geocoding: failure", error);
                this.setState({message: `geocoding error: ${error}.`});
            });
        }
    }

    render() {
        var query_repr = (
            this.state.geocodes.length > 0
            ? `(${this.state.query.lat}, ${this.state.query.lon})`
            : ""
        )
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
                            name="lat"
                            style={textFieldStyle}
                            errorText={this.state.errors.lat}
                            floatingLabelText="Latitude"
                            floatingLabelFixed={true}
                            hintText="Latitude"
                            value={this.state.lat}
                            onChange={this.handleLatChange}
                        />
                    </label>

                    <label>
                        <TextField
                            type="text"
                            name="lon"
                            style={textFieldStyle}
                            errorText={this.state.errors.lon}
                            floatingLabelText="Longitude"
                            floatingLabelFixed={true}
                            hintText="Longitude"
                            value={this.state.lon}
                            onChange={this.handleLonChange}
                        />
                    </label>
                    <br/>

                    <RaisedButton
                        secondary={true}
                        type="submit"
                        label="Reverse Geocode"
                    />
                </form>

                <Snackbar
                    open={this.state.state === "started"}
                    message={"Reverse Geocoding..."}
                    autoHideDuration={4000}
                />
                <Snackbar
                    open={this.state.state === "done"}
                    message={`Retrieved ${this.state.geocodes.length} reverse geocodes`}
                    autoHideDuration={4000}
                />

            <div className="geocodes" style={{
                whiteSpace: "nowrap",
            }}>
                {query_repr && 
                <Subheader>
                    Reverse geocodes for {query_repr}
                </Subheader>
                }
                    <List>
                        {this.state.geocodes.map(renderGeocode)}
                    </List>
                </div>
            </div>
        );
    }
}
