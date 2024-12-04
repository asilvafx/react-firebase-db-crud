import React, { useState } from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { v4 as uuidv4 } from 'uuid';
import DBService from "../data/db.service.js";
import { encryptPassword } from '../lib/crypto.js';

const RegisterForm  = () => {
    const { t } = useTranslation();
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
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

    const handleSubmit  = async (e) => {
        e.preventDefault();
        setLoading(true);

        if( !displayName || !email || !password ) {
            setErrorMessage("Missing information. Fill all fields and try again!");
            setLoading(false);
            return;
        } else
        if(password !== confirmPassword){
            setErrorMessage("Passwords do not match!");
            setLoading(false);
            return;
        }

        try {

        const newUserId = uuidv4();
        // Check if the email already exists
        const user = await DBService.getItemByKeyValue( 'email', email, 'users')

        if (user) {
            setErrorMessage("Email already exists in our system!");
            setLoading(false);
            return;
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
                    console.log("Account created successfully!");
                    setSubmitted(true);
                    setErrorMessage("");
                })
                .catch((e) => {
                    console.log(e);
                    setLoading(false);
                });

        }
        } catch (error) {
            console.log(error);
            setLoading(false);
        } finally {
           //
        }

    }; 

    return (
        <div className="submit-form">
            {submitted ? (
                <div className="w-full max-w-2xl flex flex-col items-center justify-center m-auto">
                    <h4 className="mb-4">Account created successfully!</h4>
                    <Link to="/" className="btn px-4 py-2">
                        Sign in
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="w-full max-w-2xl p-6 border flex flex-col m-auto">

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

                    {errorMessage && (
                        <div className="text-red-500 mb-4">{errorMessage}</div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn bg-blue-600 text-white px-4 py-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Creating...' : 'Create account'}
                    </button>

                    <p className="mt-4 text-center text-gray-500 text-sm">By signing up you agree with our Terms &
                        Conditions.</p>

                </form>
            )}
        </div>
    );
};

export default RegisterForm;