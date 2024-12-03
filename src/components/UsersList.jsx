import React, { useState, useEffect } from "react";
import DBService from "../data/db.service.js";
import UserView from "./UserView";
import { onValue } from "firebase/database";
import { FaUser  } from "react-icons/fa";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [currentUser , setCurrentUser ] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        const usersRef = DBService.getAll('users'); // Get the reference
        const unsubscribe = onValue(usersRef, onDataChange); // Listen for changes

        // Cleanup function to remove the listener
        return () => unsubscribe();
    }, []); // Empty dependency array means this effect runs once on mount

    const onDataChange = (snapshot) => {
        let usersList = [];

        snapshot.forEach((childSnapshot) => {
            let key = childSnapshot.key;
            let data = childSnapshot.val();
            usersList.push({
                key: key,
                displayName: data.displayName,
                email: data.email,
                password: data.password,
                status: data.status,
                isAdmin: data.isAdmin,
                uid: data.uid, 
            });
        });

        setUsers(usersList);
    };

    const refreshList = () => {
        setCurrentUser (null);
        setCurrentIndex(-1);
    };

    const setActiveUser  = (user, index) => {
        setCurrentUser (user);
        setCurrentIndex(index);
    };

    const removeAllUsers = () => {
        DBService.deleteAll('users')
            .then(() => {
                refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
            <div className="w-full border p-8">
                <h4 className="text-lg text-gray-500 mb-4">Users List</h4>

                <ul className="list-group bg-secondary p-4 rounded-md mb-4">
                    {users &&
                        users.map((user, index) => (
                            <li
                                className={
                                    "list-group-item rounded-sm border-b border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 flex justify-between items-center " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveUser (user, index)}
                                key={user.key} // Use user.key instead of index
                            >
                                <span>{user.email}</span>
                                <span><FaUser  /></span>
                            </li>
                        ))}
                </ul>

                <button
                    className="btn btn-sm btn-danger px-4 py-2 rounded-lg"
                    onClick={removeAllUsers}
                >
                    Delete All
                </button>
            </div>
            <div className="w-full border p-8">
                {currentUser  ? (
                    <UserView
                          user={currentUser }
                          refreshList={refreshList}
                    />
                ) : (
                    <div>
                        <p>Please select a User...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersList;