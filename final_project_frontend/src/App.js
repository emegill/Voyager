import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [],
            counter: 1,
            emails: [],
            sites: []
        };
        this.addInput = this.addInput.bind(this);
        this.setSite = this.setSite.bind(this);
        this.submitSite = this.submitSite.bind(this);
    }

    setSite(event) {
        let url = event.target.value;
        let index = event.target.id;
        let sites = this.state.sites;
        sites[index] = url;
        this.setState({ sites: sites }, function() {
            console.log(this.state.sites);
        });
    }

    addInput() {
        let counter = this.state.counter + 1;
        this.setState({ counter: counter });
    }

    submitSite() {
        this.state.sites.forEach(
            function(site) {
                axios
                    .get("/scraper", {
                        params: {
                            siteUrl: site
                        }
                    })
                    .then(
                        function(response) {
                            console.log(response.data);
                            let emails = this.state.emails;
                            emails = emails.concat(response.data);
                            console.log(emails);
                            this.setState({ emails: emails });
                        }.bind(this)
                    );
            }.bind(this)
        );
    }

    render() {
        let inputs = [];

        for (let i = 0; i < this.state.counter; i++) {
            inputs.push(
                <div className="new-inputs">
                    <input
                        className="input"
                        onChange={this.setSite}
                        placeholder="Websites"
                        id={i}
                    />
                </div>
            );
        }

        let emails = this.state.emails.map(
            function(response) {
                return (
                    <div>
                        {this.state.siteUrl}
                        {response}
                    </div>
                );
            }.bind(this)
        );
        return (
            <div className="parallax">
                <div className="App">
                    <div className="header">
                        <h2>Voyager</h2>
                    </div>
                    <h4 className="App-header2">Lets Go Exploring!</h4>
                    <div className="input-boxes" />

                    <div>
                        {inputs}
                    </div>

                    <div>
                        <button className="button" onClick={this.addInput}>
                            Create New Exploration Field
                        </button>
                    </div>

                    <button className="button" onClick={this.submitSite}>
                        {" "}Explore Space
                        {" "}
                    </button>

                    <div className="returned_emails">
                        {emails}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
