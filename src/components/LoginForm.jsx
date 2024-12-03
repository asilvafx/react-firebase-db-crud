import React, { useState } from 'react';
import Cookies from 'js-cookie';
import DBService from '../data/db.service';
import {decryptPassword} from "../lib/crypto.js";
import {useTranslation} from "react-i18next";

const LoginForm = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Sign in the user
            // Fetch user data from the database using DBService
            const userData = await DBService.getItemByKeyValue('email', email, 'users');

            if(!userData){
                console.log('Error: Invalid credentials.');
                setError('Invalid credentials.');
                setLoading(false);
                return;
            }
            // Redirect or perform any action after successful login
            const userObj = Object.keys(userData);
            const getUserId = userObj[0];

            const currentPassword = userData[getUserId].password;
            const uid = userData[getUserId].uid;

            if(decryptPassword(currentPassword) !== password){
                console.log('Error: Invalid credentials.');
                setError('Invalid credentials.');
                setLoading(false);
                return;
            }

            setSuccess('Login Successfully! You will be now redirected..');
            Cookies.set('isLoggedIn', true, { path: '', secure: true, sameSite: 'strict' });
            Cookies.set('uid', btoa(uid), { path: '', secure: true, sameSite: 'strict' });

            window.location.reload();

        } catch (err) {
            setError(err.message);
            setLoading(false);
        } finally {
             //
        }
    };

    return (

    <div className="grid px-4">
        <div className="w-full flex flex-col border p-8">
            <div className="mb-8">
                <h1 className="text-2xl mb-2">{t('login_title')}</h1>
                <p className="text-gray-500">{t('login_description')}</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex flex-col mb-4">
                    <label htmlFor="email" className="text-sm uppercase">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="password" className="text-sm uppercase">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    {success && <div className="text-green-500 mb-4">{success}</div>}
                    <button
                        type="submit"
                        className={`btn bg-blue-600 text-white px-4 py-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                    <p className="mt-4 text-center text-gray-500 text-sm">By signing in you agree with our Terms & Conditions.</p>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;