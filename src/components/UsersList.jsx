import React, { Component } from "react";
import DBService from "../data/db.service.js";
import UserView from "./UserView";
import { onValue } from "firebase/database";
import { FaUser  } from "react-icons/fa";

export default class UsersList extends Component {
    constructor(props) {
        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveUser  = this.setActiveUser .bind(this);
        this.removeAllUsers = this.removeAllUsers.bind(this);
        this.onDataChange = this.onDataChange.bind(this);

        this.state = {
            users: [],
            currentUser: null,
            currentIndex: -1,
        };
    }

    componentDidMount() {
        const usersRef = DBService.getAll('users'); // Get the reference
        onValue(usersRef, this.onDataChange); // Listen for changes
    }

    componentWillUnmount() {
        // Note: Firebase v9+ does not have an off method for removing listeners
        // You can use a cleanup function if needed, but it's not required for onValue
    }

    onDataChange(snapshot) {
        let users = [];

        snapshot.forEach((childSnapshot) => {
            let key = childSnapshot.key;
            let data = childSnapshot.val();
            users.push({
                key: key,
                email: data.email,
                password: data.password,
                status: data.status,
            });
        });

        this.setState({
            users: users,
        });
    }

    refreshList() {
        this.setState({
            currentUser: null,
            currentIndex: -1,
        });
    }

    setActiveUser (user, index) {
        this.setState({
            currentUser: user,
            currentIndex: index,
        });
    }

    removeAllUsers() {
        DBService.deleteAll('users')
            .then(() => {
                this.refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { users, currentUser , currentIndex } = this.state;

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
                <div className="w-full border p-8">
                    <h4 className="mb-4">Users List</h4>

                    <ul className="list-group bg-secondary p-4 rounded-md mb-4">
                        {users &&
                            users.map((user, index) => (
                                <li
                                    className={
                                        "list-group-item flex justify-between items-center " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveUser (user, index)}
                                    key={user.key} // Use user.key instead of index
                                >
                                    <span>{user.email}</span>
                                    <span><FaUser  /></span>
                                </li>
                            ))}
                    </ul>

                    <button
                        className="btn btn-sm btn-danger px-4 py-2 rounded-lg"
                        onClick={this.removeAllUsers}
                    >
                        Delete All
                    </button>
                </div>
                <div className="w-full border p-8">
                    {currentUser  ? (
                        <UserView
                              user={currentUser }
                              refreshList={this.refreshList}
                        />
                    ) : (
                        <div>
                            <p>Please select a User...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}