import React, { useState } from 'react';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom';
import DBService from '../data/db.service';
import {decryptPassword} from "../lib/crypto.js";
import {useTranslation} from "react-i18next";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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

            const currentPassword = userData.password;
            const uid = userData.uid;

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
            <Card className="bg-white dark:bg-gray-900 mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="mail@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            {error && <div className="text-red-500">{error}</div>}
                            {success && <div className="text-green-500">{success}</div>}
                        </div>


                        <Button
                            type="submit"
                            className={`w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/register" className="underline">
                            Sign up
                        </Link>
                    </div>

                </CardContent>
            </Card>
            <p className="mt-4 text-center text-gray-500 text-sm">By signing in you agree with our Terms &
                Conditions.</p>

        </div>
    );
};

export default LoginForm;