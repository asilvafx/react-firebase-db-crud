import React, { Component } from "react";
import DBService from "../services/db.service.js";

export default class AddTutorial extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.saveTutorial = this.saveTutorial.bind(this);
        this.newTutorial = this.newTutorial.bind(this);

        this.state = {
            email: "",
            password: "",
            status: false,
            submitted: false,
        };
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    saveTutorial() {
        let data = {
            email: this.state.email,
            password: this.state.password,
            status: false
        };

        DBService.create(data, 'users')
            .then(() => {
                console.log("New user created successfully!");
                this.setState({
                    submitted: true,
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    newTutorial() {
        this.setState({
            email: "",
            password: "",
            status: false,
            submitted: false,
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div className="w-full max-w-2xl flex flex-col items-center justify-center m-auto">
                        <h4 className="mb-4">New user created successfully!</h4>
                        <button className="btn px-4 py-2" onClick={this.newTutorial}>
                            Add another
                        </button>
                    </div>
                ) : (
                    <div className="w-full max-w-2xl flex flex-col items-center justify-center m-auto">
                        <div className="flex flex-col mb-4">
                            <label htmlFor="email" className="uppercase text-sm">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                required
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                name="email"
                            />
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="password" className="uppercase text-sm">Password</label>
                            <input
                                type="text"
                                className="form-control"
                                id="password"
                                required
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                name="password"
                            />
                        </div>

                        <button onClick={this.saveTutorial} className="btn px-4 py-2 rounded-lg">
                            Create
                        </button>
                    </div>
                )}
            </div>
        );
    }
}