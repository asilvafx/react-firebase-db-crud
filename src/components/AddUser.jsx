import React, { useState } from "react";
import DBService from "../data/db.service.js";
import { encryptPassword } from '../lib/crypto.js';

const AddUser  = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        setErrorMessage(""); // Clear error message on input change
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const saveUser  = () => {
        // Check if the email already exists
        DBService.getAllPromise('users') // Retrieve all users
            .then((users) => {
                // Convert users object to an array and check if the email exists
                const userExists = Object.values(users).some(user => user.email === email);
                if (userExists) {
                    setErrorMessage("Email already exists!");
                } else {
                    // Proceed to create the user
                    const data = {
                        email: email,
                        password: encryptPassword(password),
                        status: false
                    };

                    DBService.create(data, 'users')
                        .then(() => {
                            console.log("New user created successfully!");
                            setSubmitted(true);
                            setErrorMessage(""); // Clear error message on success
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                }
            })
            .catch((e) => {
                console.log(e);
                setErrorMessage("Error retrieving users.");
            });
    };

    const newUser  = () => {
        setEmail("");
        setPassword("");
        setSubmitted(false);
        setErrorMessage(""); // Clear error message when starting over
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div className="w-full max-w-2xl flex flex-col items-center justify-center m-auto">
                    <h4 className="mb-4">New user created successfully!</h4>
                    <button className="btn px-4 py-2" onClick={newUser }>
                        Add another
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-2xl flex flex-col items-center justify-center m-auto">
                    {errorMessage && (
                        <div className="text-red-500 mb-4">{errorMessage}</div>
                    )}
                    <div className="flex flex-col mb-4">
                        <label htmlFor="email" className="uppercase text-sm">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            required
                            value={email}
                            onChange={onChangeEmail}
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
                            value={password}
                            onChange={onChangePassword}
                            name="password"
                        />
                    </div>

                    <button onClick={saveUser } className="btn px-4 py-2 rounded-lg">
                        Create
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddUser ;