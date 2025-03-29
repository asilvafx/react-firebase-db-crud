import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Lock, Box } from 'lucide-react';
import { TextInput, Label } from 'flowbite-react';
import Cookies from "js-cookie";
import Loading from "@/components/Loading";

const ResetPassword = () => {
    const isLoggedIn = Cookies.get('isLoggedIn');

    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn){
            navigate('/dashboard');
        }
    }, [navigate, isLoggedIn]);

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle password reset logic
        console.log('New password:', formData);
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
                    <h1 className="text-2xl font-bold neon-text mb-2">Set New Password</h1>
                    <p className="text-gray-400">Enter your new password below</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="password" value="New Password" className="text-gray-300 mb-2" />
                        <TextInput
                            id="password"
                            type="password"
                            icon={Lock}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="confirmPassword" value="Confirm Password" className="text-gray-300 mb-2" />
                        <TextInput
                            id="confirmPassword"
                            type="password"
                            icon={Lock}
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="cyber-button w-full">
                        Reset Password
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

export default ResetPassword;