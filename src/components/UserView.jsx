import React, { useState, useEffect } from "react";
import DBService from "../data/db.service.js";
import { decryptPassword, encryptPassword } from '../lib/crypto.js';

const UserView = ({ user, refreshList }) => {
    const [currentUser , setCurrentUser ] = useState({
        key: null,
        email: "",
        password: "",
        passwordDecrypted: "",
        status: false,
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (user) {
            const decryptedPassword = user.password ? decryptPassword(user.password) : "";
            setCurrentUser ({
                ...user,
                passwordDecrypted: decryptedPassword,
            });
            setMessage("");
        }
    }, [user]); // Run this effect when the user prop changes

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setCurrentUser ((prev) => ({
            ...prev,
            email: email,
        }));
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setCurrentUser ((prev) => ({
            ...prev,
            passwordDecrypted: password,
            password: encryptPassword(password),
        }));
    };

    const updateStatus = (status) => {
        DBService.update(currentUser .key, { status }, 'users')
            .then(() => {
                setCurrentUser ((prev) => ({
                    ...prev,
                    status: status,
                }));
                setMessage("User  status was updated successfully!");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const updateUser  = () => {
        const data = {
            email: currentUser .email,
            password: currentUser .password,
        };

        DBService.update(currentUser .key, data, 'users')
            .then(() => {
                setMessage("User  profile was updated successfully!");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteUser  = () => {
        DBService.delete(currentUser .key, 'users')
            .then(() => {
                refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div>
            <h4 className="text-lg text-gray-500 mb-4">Update User</h4>
            {currentUser  ? (
                <div className="edit-form">
                    <form className="mb-4">
                        <div className="flex flex-col mb-4">
                            <label htmlFor="email" className="text-sm uppercase">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={currentUser .email || ""}
                                onChange={onChangeEmail}
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="encryptedPassword" className="text-sm uppercase">Encrypted Password</label>
                            <input
                                type="text"
                                className="form-control pointer-events-none"
                                id="encryptedPassword"
                                value={currentUser .password || ""}
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
                                value={currentUser .passwordDecrypted || ""}
                                onChange={onChangePassword}
                            />
                        </div>

                        <div className="inline-flex gap-1 items-center">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            <span
                                className={`uppercase ${currentUser .status ? "text-blue-500" : "text-gray-600"}`}>
                                {currentUser .status ? "Active" : "Inactive"}
                            </span>
                        </div>
                    </form>

                    {currentUser .status ? (
                        <button
                            className="btn bg-gray-600 text-white mr-2 px-2 py-1 rounded-md"
                            onClick={() => updateStatus(false)}
                        >
                            Disable
                        </button>
                    ) : (
                        <button
                            className="btn bg-blue-600 text-white mr-2 px-2 py-1 rounded-md"
                            onClick={() => updateStatus(true)}
                        >
                            Activate
                        </button>
                    )}

                    <button
                        className="btn bg-green-600 text-white mr-2 px-2 py-1 rounded-md"
                        onClick={updateUser }
                    >
                        Update
                    </button>
                    <button
                        className="btn bg-red-600 text-white px-2 py-1 rounded-md"
                        onClick={deleteUser }
                    >
                        Delete
                    </button>
                    {message && <div className="mt-2 text-green-500">{message}</div>}
                </div>
            ) : (
                <div>
                    <p>Please select a User to view details...</p>
                </div>
            )}
        </div>
    );
};

export default UserView;