import React, { Component } from "react";
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import { textFieldStyle } from './styles';


function dedupe(items) {
    var seen = {};
    var result = [];
    for (let item of items) {
        if (!seen[item]) {
            result.push(item);
        }
        seen[item] = true;
    }
    return result;
}


export default class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            state: "waiting",
            jwt: "",
            key: "",
            username: "",
            password: "",
            error: {
                message: "",
            },
            errors: {
                "username": "",
                "password": "",
            },
            query: {},
        };
        // Ensure handle* methods have the right `this`
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleRequestClose() {
        this.setState({
            state: "waiting"
        });
    }

    handleUsernameChange(event) {
        let username = event.target.value;
        this.setState({
            username: username,
            errors: {
                username: username ? "" : "username is required if key is not set",
                password: this.state.errors.password,
            }
        });
    }

    handlePasswordChange(event) {
        let password = event.target.value;
        this.setState({
            password: password,
            errors: {
                password: password ? "" : "password is required if key is not set",
                username: this.state.errors.username,
            }
        });
    }
    handleKeyChange(event) {
        let key = event.target.value;
        this.setState({
            key: key,
            errors: {
                key: key ? "" : "key is required if username is not set",
            }
        });
    }


    handleSubmit(event) {
        // Don't cause whole page refresh on errors.
        event.preventDefault();

        console.log("login: handleSubmit", this.state);

        // Do not issue any request unless overall validation passes
        let username = this.state.username;
        let password = this.state.password;
        let key = this.state.key;
        if (!username || !password) {
          if(!key){
              this.setState({
                  state: "error",
                  error: {
                      message: "need a valid key or username and password to log in."
                  }
              });
          }else{
            let bcs = this.props.bcs;
            this.setState({
                error: {},
                state: "started",
                query: {
                    key: key
                },
            });
            let promise = bcs.login(undefined, undefined,key);
            promise
            .then((keyval) => {
                this.setState({
                    state: "done",
                    query:{username: keyval.organization}
                });
                console.log("login: success", keyval);

                // This is only for playing around in the console.
                window.keyval = keyval;
            })
            .catch((error) => {
                console.log("login: failure", error);
                window.error = error;
                this.setState({
                    state: "error",
                    error: error
                });
            });
          }
        }
        else {
            let bcs = this.props.bcs;
            this.setState({
                error: {},
                state: "started",
                query: {
                    username: username
                },
            });
            let promise = bcs.login(username, password);
            promise
            .then((jwt) => {
                this.setState({
                    state: "done",
                });
                console.log("login: success", jwt);

                // This is only for playing around in the console.
                window.jwt = jwt;
            })
            .catch((error) => {
                console.log("login: failure", error);
                window.error = error;
                this.setState({
                    state: "error",
                    error: error
                });
            });
        }

        // TODO:
        // when entering bad credentials:
        // XML Parsing Error: no root element found
        // Location: https://api.test.boundlessgeo.io/v1/token/?username=fasufis&password=asufdi
        // Line Number 1, Column 1:
        // At minimum, this error should be caught earlier e.g. in status
        // and raised not as an XML parsing error!
    }

    render() {
        let bcs = this.props.bcs;
        let roles = [];
        if(bcs.jwt){
          roles = bcs.jwt.roles;
        }else if(bcs.key){
          roles = bcs.key.roles;
        }
        //let roles = bcs.jwt ? bcs.jwt.roles : [];
        let roleList = dedupe(roles).map(
            (role) => {
                return <ListItem
                    disabled={true}
                    key={role}
                >
                    {role}
                </ListItem>;
            }
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
                        <TextField
                            type="text"
                            name="username"
                            style={textFieldStyle}
                            errorText={this.state.errors.username}
                            floatingLabelText="Boundless Connect Username"
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                        />
                    </label>
                    <br/>
                    <label>

                        <TextField
                            type="password"
                            name="password"
                            style={textFieldStyle}
                            errorText={this.state.errors.password}
                            floatingLabelText="Boundless Connect Password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        />

                    </label>
                    <br/>
                    <label>
                        <TextField
                            type="text"
                            name="key"
                            style={textFieldStyle}
                            errorText={this.state.errors.key}
                            floatingLabelText="Boundless Connect Key"
                            value={this.state.key}
                            onChange={this.handleKeyChange}
                        />
                    </label>
                    <br/>
                    <RaisedButton
                        type="submit"
                        label="Log in"
                        primary={true}
                        style={{
                            backgroundColor: "#558B2F"
                        }}
                    />
                </form>
                <div className="roles">
                    {roleList.length > 0 &&
                        <div>
                            <Subheader>
                                Roles for {this.state.query.username}
                            </Subheader>
                            <List>
                                {roleList}
                            </List>
                        </div>
                    }
                </div>

                <Snackbar
                    open={this.state.state === "started"}
                    message={`Logging in as ${this.state.query.username}...`}
                    autoHideDuration={4000}
                />

                <Snackbar
                    open={this.state.state === "done"}
                    message={`Logged in as ${this.state.query.username}`}
                    onRequestClose={this.handleRequestClose}
                    autoHideDuration={4000}
                />

                <Snackbar
                    open={this.state.state === "error"}
                    message={`Error logging in: ${this.state.error.message}`}
                    onRequestClose={this.handleRequestClose}
                    autoHideDuration={4000}
                />

            </div>
       );
    }
}
