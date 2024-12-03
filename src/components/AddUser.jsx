import React, { useState } from "react";
import DBService from "../data/db.service.js";
import { encryptPassword } from '../lib/crypto.js';
import { v4 as uuidv4 } from 'uuid';
import {useTranslation} from "react-i18next";

const AddUser  = () => {
    const { t } = useTranslation();
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onChangeDisplayName = (e) => {
        setDisplayName(e.target.value);
        setErrorMessage(""); // Clear error message on input change
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        setErrorMessage(""); // Clear error message on input change
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const saveUser  = () => {

        if(password !== confirmPassword){
            setErrorMessage("Passwords do not match!");
            return;
        }

        const newUserId = uuidv4();

        // Check if the email already exists
        DBService.getItemByKeyValue( 'email', email, 'users')
        .then((user) => {
            if (user) {
                setErrorMessage("Email already exists!");
            } else {
                // Proceed to create the user
                const data = {
                    uid: newUserId,
                    displayName: displayName,
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
        .catch((error) => {
            console.error('Error fetching user:', error);
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
                <div className="w-full max-w-2xl p-6 border flex flex-col m-auto">
                    {errorMessage && (
                        <div className="text-red-500 mb-4">{errorMessage}</div>
                    )}
                    <div className="mb-8">
                        <h1 className="text-2xl mb-2">{t('register_title')}</h1>
                        <p className="text-gray-500">{t('register_description')}</p>
                    </div>
                    <div className="w-full flex flex-col mb-4">
                        <label htmlFor="email" className="uppercase text-sm">Account Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="displayName"
                            required
                            value={displayName}
                            onChange={onChangeDisplayName}
                            name="displayName"
                        />
                    </div>
                    <div className="w-full flex flex-col mb-4">
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

                    <div className="w-full flex flex-col mb-4">
                        <label htmlFor="password" className="uppercase text-sm">Choose Password</label>
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

                    <div className="w-full flex flex-col mb-4">
                        <label htmlFor="password" className="uppercase text-sm">Confirm Password</label>
                        <input
                            type="password" // Change to password type for security
                            className="form-control"
                            id="confirm-password"
                            required
                            value={confirmPassword}
                            onChange={onChangeConfirmPassword}
                            name="confirm-password"
                        />
                    </div>

                    <button onClick={saveUser} className="btn bg-blue-600 text-white px-4 py-2 rounded-md">
                        Create account
                    </button>
                    <p className="mt-4 text-center text-gray-500 text-sm">By signing up you agree with our Terms &
                        Conditions.</p>

                </div>
            )}
        </div>
    );
};

export default AddUser;