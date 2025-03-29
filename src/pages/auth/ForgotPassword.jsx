import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Mail, Box } from 'lucide-react';
import { TextInput, Label } from 'flowbite-react';
import Cookies from "js-cookie";
import Loading from "@/components/Loading";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const isLoggedIn = Cookies.get('isLoggedIn');

    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn){
            navigate('/dashboard');
        }
    }, [navigate, isLoggedIn]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle password reset logic
        console.log('Reset password for:', email);
    };

    if(isLoggedIn){
        return (<Loading />)
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="premium-panel p-8 rounded-xl w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <Box className="w-12 h-12 premium-icon" />
                    </div>
                    <h1 className="text-2xl font-bold neon-text mb-2">Reset Password</h1>
                    <p className="text-gray-400">Enter your email to receive reset instructions</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="email" value="Email" className="text-gray-300 mb-2" />
                        <TextInput
                            id="email"
                            type="email"
                            icon={Mail}
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="cyber-button w-full">
                        Send Reset Link
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400">
                    Remember your password?{' '}
                    <Link to="/login" className="text-cyan-400 hover:text-cyan-300">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;