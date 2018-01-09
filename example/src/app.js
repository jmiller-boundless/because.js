import { Because } from 'becausejs';
import React, { Component } from 'react';
import './app.css';

import Login from './login';
import Routing from './routing';
import Geocoding from './geocoding';
import ReverseGeocoding from './reverse_geocoding';
import Search from './search';
//import DataSearch from './data_search';
import { Basemap } from './basemap';
import KeyManage from './keymanage';

// material-ui stuff
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';


const muiTheme = getMuiTheme({
  palette: {
      // accent1Color: "#D84315",
      // accent1Color: "#558B2F",
      // accent1Color: "#f68c4f",
  },
});


class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            bcs: new Because('test', true)  // env='test', debug=true
        };

        // Make bcs object available to play with in console
        window.bcs = this.state.bcs;
    }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div className='App'>

        <AppBar
            title="BCS Demos"
            // no hamburger menu, that's really for mobile sizes
            iconElementLeft={<div></div>}
            style={{
                width: "100%",
            }}
        >
        </AppBar>

        <Tabs>
            <Tab className="tab" value="login" label="Log In"
            >
                <div className="tabContent">
                <Login
                    bcs={this.state.bcs}
                    message={
                        <div>

                            <p>
                            Log in here first. Most of the other demos require
                        a login.
                            </p>

                            <p>
                            When your app logs in with credentials provided by
                        the user, it also gets a list of roles that apply to
                        the current user, determining what content or
                        capabilities they have access to.
                            </p>

                        </div>
                    }
                />
        </div>

            </Tab>
            <Tab value="routing" label="Routing"
            >
                <div className="tabContent">
                <Routing
                    bcs={this.state.bcs}
                    message={
                        <div>

                        <p>
                        Get a route between two street addresses.
                        </p>

                        <p>
                        This returns a route object with a list of legs; each
                        leg with its own list of steps; and each step with its
                        own instructions and geometry suitable for display on a
                        slippy map (not shown here). Estimated distance
                        and duration of travel is available for each step,
                        leg, and route. How you present this data is entirely
                        up to you.
                        </p>

                        <p>
                        BCS and <code>because.js</code> can also handle
                        mixed sequences of 3 or more addresses or points,
                        but this demo only uses two addresses for simplicity.
                        </p>

                        <p>
                        The routing data provided through BCS may come from
                        hosted services from Mapbox or Mapzen, or alternatively
                        from your own deployment of the open source routing
                        engines Graphhopper or Valhalla.
                        </p>

                        </div>
                    }
                />
                </div>
            </Tab>
            <Tab value="geocoding" label="Geocoding"
            >
                <div className="tabContent">
                <Geocoding
                    bcs={this.state.bcs}
                    message={
                        <div>
                        <p>
                        Get points that may match a given address.
                        </p>
                        <p>
                        Multiple candidate points are returned, and you can
                        choose from or display these points any way you wish.
                        </p>
                        </div>
                    }
                />
        </div>
            </Tab>
            <Tab value="reverseGeocoding" label="Reverse Geocoding"
             >
                <div className="tabContent">
                <ReverseGeocoding
                    bcs={this.state.bcs}
                    message={
                        <div>
                        <p>
                        Get addresses that may match a given point.
                        </p>
                        <p>
                        Multiple candidate addresses are returned, and you can
                        choose from or display these any way you wish.
                        </p>
                        <p>
                        This demo shows all the features that Mapzen has
                        for null island (0, 0).
                        </p>
                        </div>
                    }
                />
        </div>
            </Tab>

            <Tab value="search" label="Search"
            >
                <div className="tabContent">
                <Search
                    bcs={this.state.bcs}
                    message={
                        <div>
                        <p>
                        Search for information on Boundless Connect.
                        </p>
                        <p>
                        While this demo doesn't work quite right yet, the
                        BCS search service and the code in&nbsp;
                        <code>because.js</code> are working just fine.
                        </p>
                        </div>
                    }
                />
                </div>
            </Tab>

            <Tab value="basemaps" label="Basemaps"
            >
                <div className="tabContent">
                <Basemap
                    bcs={this.state.bcs}
                    message={
                        <div>
                        <p>
                        Discover basemaps offered through BCS.
                        </p>
                        <p>
                        This demo doesn't display the basemaps, but the
                        endpoints it provides are just the kind you can drop
                        into Boundless Web SDK, OpenLayers 3 or Leaflet.
                        BCS makes it easy to discover all the basemaps provided
                        through Boundless and offer them for use in your own
                        apps.
                        </p>
                        </div>
                    }
                />
        </div>
            </Tab>
            <Tab className="tab" value="keymanage" label="Manage Keys"
            >
                <div className="tabContent">
                <KeyManage
                    bcs={this.state.bcs}
                    message={
                        <div>
                        <p>
                        Manage BCS API keys.
                        </p>
                        </div>
                    }
                />
                </div>
            </Tab>
        </Tabs>

      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
