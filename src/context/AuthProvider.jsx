import { createContext, useContext, useState } from "react";
import Cookies from 'js-cookie';
import DBService from '../data/db.service';
import { decryptHash, encryptHash } from "../lib/crypto.js";
import toast from 'react-hot-toast';
import { useUser } from './UserProvider';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser ] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");

    const { setUserData } = useUser();

    const registerAction = async (data) => {
        try {
            const userCheck = await DBService.getItemByKeyValue('email', data.username, 'users');

            if (userCheck) {
                toast.error('Email address already exists in our system!');
                return false;
            }


            const userData = {
                email: data.username,
                password: encryptHash(data.password),
                displayName: data.fullName,
                world_id: null,
                is_admin: false,
            };

            try {
                await DBService.create(userData, 'users');
                toast.success("Registration successful!");
                return true;
            } catch (error) {
                console.error("Error creating user:", error);
                toast.error("Registration failed. Please try again.");
                return false;
            }
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const loginAction = async (data) => {
        try {
            const userData = await DBService.getItemByKeyValue('email', data.username, 'users');

            if (!userData) {
                return 'Error: Invalid credentials.'; // Return error message
            }
            const currentPassword = userData.password;

            if (decryptHash(currentPassword) !== data.password) {
                return 'Error: Invalid credentials.'; // Return error message
            }

            const userKey = await DBService.getItemKey('email', data.username, 'users');

            // Add userKey to userData
            const fetchedData = {
                ...userData,
                uid: userKey, // Add the userKey here
            };

            if(setData(fetchedData)){
                toast.success('Login Successfully!');
                return true;
            } else {
                toast.error('Login Failed! Please, try again later.');
                return false;
            }
        } catch (err) {
            console.error(err);
            return 'Error: An unexpected error occurred.'; // Return a generic error message
        }
    };

    const loginWorldId = async (data) => {
        if(!data){
            return false;
        }
        if(setData(data)){
            toast.success('Login Successfully!');
            return true;
        } else {
            toast.error('Login Failed! Please, try again later.');
            return false;
        }
    }

    function setData(data) {
        if(!data){
            return false;
        }
        const udata = encryptHash(JSON.stringify(data));
        const token = encryptHash(data.email);
        setUser(data);
        setToken(token);
        setUserData(data);
        Cookies.set('isLoggedIn', true, { path: '', secure: true, sameSite: 'strict', expires: 7 });
        Cookies.set('tkn', token, { path: '', secure: true, sameSite: 'strict', expires: 7 });
        Cookies.set('uData', udata, { path: '', secure: true, sameSite: 'strict', expires: 7 });
        return true;
    }

    const logOut = () => {
        setUser (null);
        setToken("");
    };

    return (
        <AuthContext.Provider value={{ token, user, registerAction, loginAction, loginWorldId, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};