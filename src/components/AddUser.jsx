    import React, { Component } from "react";
    import DBService from "../data/db.service.js";

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
                errorMessage: "", // State to hold error messages
            };
        }

        onChangeEmail(e) {
            this.setState({
                email: e.target.value,
                errorMessage: "", // Clear error message on input change
            });
        }

        onChangePassword(e) {
            this.setState({
                password: e.target.value,
            });
        }

        saveTutorial() {
            const { email, password } = this.state;

            // Check if the email already exists
            DBService.getAllPromise('users') // Retrieve all users
                .then((users) => {
                    // Convert users object to an array and check if the email exists
                    const userExists = Object.values(users).some(user => user.email === email);
                    if (userExists) {
                        this.setState({ errorMessage: "Email already exists!" });
                    } else {
                        // Proceed to create the user
                        let data = {
                            email: email,
                            password: password,
                            status: false
                        };

                        DBService.create(data, 'users')
                            .then(() => {
                                console.log("New user created successfully!");
                                this.setState({
                                    submitted: true,
                                    errorMessage: "", // Clear error message on success
                                });
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                    }
                })
                .catch((e) => {
                    console.log(e);
                    this.setState({ errorMessage: "Error retrieving users." });
                });
        }

        newTutorial() {
            this.setState({
                email: "",
                password: "",
                status: false,
                submitted: false,
                errorMessage: "", // Clear error message when starting over
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
                            {this.state.errorMessage && (
                                <div className="text-red-500 mb-4">{this.state.errorMessage}</div>
                            )}
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
                                    type="password" // Change to password type for security
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