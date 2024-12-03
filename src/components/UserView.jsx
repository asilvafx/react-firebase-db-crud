import React, { Component } from "react";
import DBService from "../data/db.service.js";
import { decryptPassword, encryptPassword } from '../lib/crypto.js';
export default class UserView extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
            currentUser: {
                key: null,
                email: "",
                password: "",
                passwordDecrypted: "",
                status: false,
            },
            message: "",
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { user } = nextProps;
        if (prevState.currentUser.key !== user.key) {
            return {
                currentUser: user,
                message: ""
            };
        }

        return prevState.currentUser;
    }

    componentDidMount() {
        this.setState({
            currentUser: this.props.user,
        });

        if(this.state.currentUser.password && this.state.currentUser.password.length > 0){
            this.state.currentUser.passwordDecrypted = decryptPassword(this.state.currentUser.password);
        }
    }

    onChangeEmail(e) {
        const email = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    email: email,
                },
            };
        });
    }

    onChangePassword(e) {
        const password = e.target.value;

        this.setState((prevState) => ({
            currentUser: {
                ...prevState.currentUser,
                passwordDecrypted: password,
                password: encryptPassword(password),
            },
        }));
    }

    updateStatus(status) {
        DBService.update(this.state.currentUser.key, {
            status: status,
        }, 'users')
            .then(() => {
                this.setState((prevState) => ({
                    currentUser: {
                        ...prevState.currentUser,
                        status: status,
                    },
                    message: "User status was updated successfully!",
                }));
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateUser() {
        const data = {
            email: this.state.currentUser.email,
            password: this.state.currentUser.password,
        };

        DBService.update(this.state.currentUser.key, data, 'users')
            .then(() => {
                this.setState({
                    message: "User profile was updated successfully!",
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    deleteUser() {
        DBService.delete(this.state.currentUser.key, 'users')
            .then(() => {
                this.props.refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div>
                <h4 className="text-lg text-gray-500 mb-4">Update User</h4>
                {currentUser ? (
                    <div className="edit-form">
                        <form className="mb-4">
                            <div className="flex flex-col mb-4">
                                <label htmlFor="email" className="text-sm uppercase">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={currentUser.email}
                                    onChange={this.onChangeEmail}
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="encryptedPassword" className="text-sm uppercase">Encrypted Password</label>
                                <input
                                    type="text"
                                    className="form-control pointer-events-none"
                                    id="encryptedPassword"
                                    value={currentUser.password}
                                    readOnly={true}
                                    aria-disabled={true}
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="password" className="text-sm uppercase">Decrypted Password</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="password"
                                    value={currentUser.passwordDecrypted}
                                    onChange={this.onChangePassword}
                                />
                            </div>

                            <div className="inline-flex gap-1 items-center">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                <span
                                    className={`uppercase ${currentUser.status ? "text-blue-500" : "text-gray-600"}`}>{currentUser.status ? "Active" : "Inactive"}</span>
                            </div>
                        </form>

                        {currentUser.status ? (
                            <button
                                className="btn bg-gray-600 text-white mr-2 px-2 py-1 rounded-md"
                                onClick={() => this.updateStatus(false)}
                            >
                                Disable
                            </button>
                        ) : (
                            <button
                                className="btn bg-blue-600 text-white mr-2 px-2 py-1 rounded-md"
                                onClick={() => this.updateStatus(true)}
                            >
                                Activate
                            </button>
                        )}

                        <button
                            className="btn bg-red-600 text-white mr-2 px-2 py-1 rounded-md"
                            onClick={this.deleteUser}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="btn bg-green-600 text-white px-2 py-1 rounded-md"
                            onClick={this.updateUser}
                        >
                            Update
                        </button>
                        <div className="mt-2">
                            <p>{this.state.message}</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p>Please select a User...</p>
                    </div>
                )}
            </div>
        );
    }
}