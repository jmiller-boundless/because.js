import React, { Component } from "react";
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { textFieldStyle } from './styles';


// eslint-disable-next-line
function render_distance_km(distance) {
    return (distance / 1000.0).toFixed(2) + " km";
}


function render_distance_mi(distance) {
    return (distance / 1609.34).toFixed(2) + " mi";
}


function render_duration(duration) {
    let minutes = Math.floor(duration / 60);
    let seconds = duration - (minutes * 60);
    let hours = Math.floor(minutes / 60);
    minutes -= (hours * 60);

    let hours_text = hours ? hours.toFixed(0) + "h" : "";
    let minutes_text = minutes ? minutes.toFixed(0) + "m" : "";
    let seconds_text = seconds ? seconds.toFixed(0) + "s" : "";
    return (
        <span className="value duration">
            {hours_text} {minutes_text} {seconds_text}
        </span>
    );
}


function render_step(step, key) {
    if (!step) {
        return undefined;
    }

    return <ListItem
        disabled={true}
        key={key}
        className="step"
    >
        <span className="instructions">{step.instructions}</span>
        <div>
            {step.distance ?
                <span>
                {render_distance_mi(step.distance)}
                {render_duration(step.duration)}
                </span>
                : null
            }
        </div>
    </ListItem>;
}


function render_leg(leg, key) {
    if (!leg) {
        return undefined;
    }
    let distance = render_distance_mi(leg.distance);
    let duration = render_duration(leg.duration);
    let index = key + 1;
    return <ListItem
        key={key}
        style={{
        }}
        primaryText={
            <span style={{
                marginRight: "1.5em",
            }}>
            Leg {index}:&nbsp;{distance},&nbsp;{duration}
            </span>
        }
        initiallyOpen={true}
        primaryTogglesNestedList={true}
        className="leg"
        nestedItems={
            leg.steps.map(render_step)
        }
    >
    </ListItem>;
}


function render_route(route) {
    if (!route) {
        return undefined;
    }
    return <div className="route">
        <List style={{
        }}>
            {route.legs.map(render_leg)}
        </List>
    </div>;
}


export default class Routing extends Component {
    constructor (props) {
        super(props);
        this.state = {
            state: "waiting",
            route: "",
            provider: "mapzen",
            start: "roma",
            end: "milano",
            error: {
                text: "",
            },
            errors: {
                "start": "",
                "end": "",
            },
            query: undefined,
        };
        // Ensure handle* methods have the right `this`
        this.handleProviderChange = this.handleProviderChange.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.refreshRoutings = this.refreshRoutings.bind(this);
    }

    handleProviderChange(event, index, selected) {
        var provider = event.target.value || selected;
        this.setState({
            provider: provider
        });
    }

    handleStartChange(event) {
        var start = event.target.value;
        this.setState({
            start: start,
            errors: {
                start: start ? "" : "start address required",
                end: this.state.errors.end,
            },
        });
    }

    handleEndChange(event) {
        var end = event.target.value;
        this.setState({
            end: end,
            errors: {
                start: this.state.errors.start,
                end: end ? "" : "end address required",
            },
        });
    }

    handleSubmit(event) {
        // Don't cause whole page refresh on errors.
        event.preventDefault();

        console.log("routing: handleSubmit", this.state, this.props);

        let bcs = this.props.bcs;
        let provider = this.state.provider;
        let start = this.state.start;
        let end = this.state.end;

        if (!bcs) {
            this.setState({
                state: "error",
                error: {
                    text: "ensure the bcs prop is passed to this component."
                }
            });
        }
        else if (!bcs.jwt&&!bcs.key) {
            this.setState({
                state: "error",
                error: {
                    text: "please log in first."
                }
            });
        }
        else if (!provider || !start || !end) {
            this.setState({
                state: "error",
                error: {
                    text: "submit valid provider, start, and end."
                }
            });
        }
        else {
            let waypoints = [start, end];
            let promise = bcs.routing.route(waypoints, provider);

            this.setState({
                state: "started",
                query: {
                    provider: provider,
                    start: start,
                    end: end,
                }
            });

            promise.then((route) => {
                console.log("route: success", route);
                this.setState({
                    state: "done",
                    route: route
                });

                // Just for playing around in the console, not for real apps
                window.route = route;
            })
            .catch((error) => {
                console.log("route: failure", error);
                window.error = error;
                this.setState({
                    route: undefined,
                    state: "error",
                    error: error
                });
            });

        }
    }

    handleRequestClose() {
        this.setState({
            state: "waiting"
        });
    }

    refreshRoutings() {
        let bcs = this.props.bcs;
        let promise = bcs.routing.get_routings();
        promise.then((result) => {
            console.log("refreshRoutings result", result);
            // this.setState({
            //     routing: result,
            // });
        });
    }

    render() {
        var query_repr = (
            this.state.route
            ? `from "${this.state.query.start}" to "${this.state.query.end}"`
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
                        autoWidth={false}
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
                        name="start"
                        style={textFieldStyle}
                        errorText={this.state.errors.start}
                        floatingLabelText="Starting Address"
                        hintText="Starting Address"
                        value={this.state.start}
                        onChange={this.handleStartChange}
                    />

                </label>
                <br/>
                <label>

                    <TextField
                        type="text"
                        name="end"
                        style={textFieldStyle}
                        errorText={this.state.errors.end}
                        floatingLabelText="End Address"
                        hintText="End Address"
                        value={this.state.end}
                        onChange={this.handleEndChange}
                    />

                </label>
                <br/>
                <RaisedButton
                    primary={true}
                    type="submit"
                    label="Get Route"
                />
            </form>

            <Snackbar
                open={this.state.state === "started"}
                message={"Routing..."}
                autoHideDuration={4000}
            />

            <Snackbar
                open={this.state.state === "done"}
                message={"Retrieved route"}
                onRequestClose={this.handleRequestClose}
                autoHideDuration={4000}
            />

            <Snackbar
                open={this.state.state === "error"}
                message={`Error retrieving route: ${this.state.error.text}`}
                onRequestClose={this.handleRequestClose}
                autoHideDuration={4000}
            />

            <div>
                {query_repr &&
                <Subheader>
                    Route {query_repr}
                </Subheader>
                }
                {render_route(this.state.route)}
            </div>
        </div>
        );
    }
            // <button onClick={this.refreshRoutings}>
            //     Refresh Routing Services
            // </button>

}
