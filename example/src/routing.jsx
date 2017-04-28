import React, { Component } from "react";


function render_distance(distance) {
    let km = distance / 1000.0;
    return (
        <span className="value distance">
            {km.toFixed(2)}
        </span>
    );
}


function render_duration(duration) {
    let minutes = Math.floor(duration / 60);
    let seconds = duration - (minutes * 60);

    let minutes_text = minutes ? minutes.toFixed(0) + "m" : "";
    let seconds_text = seconds ? seconds.toFixed(0) + "s" : "";
    return (
        <span className="value duration">
            {minutes_text}
            {seconds_text}
        </span>
    );
}


function render_step(step, key) {
    if (!step) {
        return undefined;
    }

    return <li key={key} className="step">
        <span className="instructions">{step.instructions}.</span>
        <div className="attributes">
            {render_distance(step.distance)}
            {render_duration(step.duration)}
        </div>
    </li>;
}


function render_leg(leg, key) {
    if (!leg) {
        return undefined;
    }
    return <li key={key} className="leg">
        <span>Leg</span>
        <div className="attributes">
            {render_distance(leg.distance)}
            {render_duration(leg.duration)}
        </div>
        <ol>
            {leg.steps.map(render_step)}
        </ol>
    </li>;
}


function render_route(route) {
    if (!route) {
        return undefined;
    }
    return <div className="route">
        <span>Route
        </span>
        <div className="attributes">
            {render_distance(route.distance)}
            {render_duration(route.duration)}
        </div>
        <ol>
            {route.legs.map(render_leg)}
        </ol>
    </div>;
}


class Routing extends Component {
    constructor (props) {
        super(props);
        this.state = {
            message: "let's route!",
            route: "",
            provider: "mapbox",
            start: "roma",
            end: "milano",
            // start: "1530 davis rd, lawrence, ks",
            // end: "1600 pennsylvania ave., washington, dc",
        };
        // Ensure handle* methods have the right `this`
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleProviderChange(event) {
        this.setState({provider: event.target.value});
    }

    handleStartChange(event) {
        this.setState({start: event.target.value});
    }

    handleEndChange(event) {
        this.setState({end: event.target.value});
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
                message: "ensure the bcs prop is passed to this component."
            });
        }
        else if (!bcs.jwt) {
            this.setState({message: "log in first."});
        }
        else if (!start || !end) {
            this.setState({message: "submit valid start and end."});
        }
        else if (!provider) {
            this.setState({message: "submit valid provider."});
        }
        else {
            this.setState({message: "routing..."});
            let waypoints = [start, end];
            let promise = bcs.routing.route(waypoints, provider);
            promise.then((route) => {
                console.log("route: success", route);
                this.setState({
                    message: `successfully retrieved a route.`,
                    route: route
                });

                // Just for playing around in the console, not for real apps
                window.route = route;
            })
            .catch((error) => {
                console.log("route: failure", error);
                this.setState({message: `route error: ${error}.`});
            });
        }
    }

    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    <div className="input_label_div">
                        <span>Provider</span>
                    </div>
                    <select
                        value={this.state.provider}
                        onChange={this.handleProviderChange}
                    >
                        <option value="mapbox">Mapbox</option>
                        <option value="mapzen">Mapzen</option>
                    </select>
                </label>
                <br/>
                <label>
                    <div className="input_label_div">
                        <span>Start</span>
                    </div>
                    <input className="address" type="text"
                        value={this.state.start}
                        onChange={this.handleStartChange}
                    />
                </label>
                <br/>
                <label>
                    <div className="input_label_div">
                        <span>End</span>
                    </div>
                    <input className="address" type="text"
                        value={this.state.end}
                        onChange={this.handleEndChange}
                    />
                </label>
                <br/>
                <input type="submit" value="Submit" />
            </form>
            <div>
                Status: {this.state.message}
            </div>
            <div>
                {render_route(this.state.route)}
            </div>
        </div>;
    }
}


export default Routing;
