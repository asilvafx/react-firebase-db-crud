import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';
import Cookies from "js-cookie";
import { Label } from 'flowbite-react';
import { useAuth } from '@/context/AuthProvider';
import Loading from '@/components/Loading';
import GoBack from '@/components/GoBack';
import logo_icon from '@/assets/vite.svg'
const Register = () => {
    const isLoggedIn = Cookies.get('isLoggedIn');

    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn){
            navigate('/dashboard');
        }
    }, [navigate, isLoggedIn]);

    const [input, setInput] = useState({
        username: '',
        fullName: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(null);
    const auth = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (input.password !== input.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (!isValidPassword(input.password)) {
            setError("Password must be at least 8 characters long and include letters, numbers, or special characters.");
            return;
        }
        const response = await auth.registerAction(input);
        if (response) {
            navigate('/login'); // Redirect to login after successful registration
        } else {
            setError("Registration failed. Please try again.");
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const isValidPassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d|(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?]))[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>?]{8,}$/;
        return regex.test(password);
    };

    if(isLoggedIn){
        return (<Loading />)
    }

    return (
        <section className="w-full max-w-lg mx-auto min-h-screen my-10 flex flex-col items-center justify-center">

            <div className="w-full flex justify-start mb-6">
                <GoBack url="/" text="Go Back" noStyle={true} />
            </div>

            <div className="w-full premium-panel p-4 md:p-8 rounded-xl">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <img className="h-12 w-auto filter !invert" alt="Logo" width={80} height={80} src={logo_icon} />
                    </div>
                    <h1 className="text-2xl font-bold neon-text mb-2">Create Account</h1>
                    <p className="text-gray-400">Join the CyberChest community</p>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <Label className="text-neutral-100" htmlFor="fullName" value="Full Name" />
                        <input
                            className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="John Doe"
                            required
                            value={input.fullName}
                            onChange={handleInput}
                        />
                    </div>
                    <div>
                        <Label className="text-neutral-100" htmlFor="username" value="Email" />
                        <input
                            className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                            id="username"
                            name="username"
                            type="email"
                            placeholder="example@yahoo.com"
                            required
                            value={input.username}
                            onChange={handleInput}
                        />
                    </div>
                    <div>
                        <Label className="text-neutral-100" htmlFor="password" value="Password" />
                        <input
                            className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg mb-4"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="********"
                            required
                            value={input.password}
                            onChange={handleInput}
                        />
                        <PasswordStrengthBar password={input.password} />
                    </div>
                    <div>
                        <Label className="text-neutral-100" htmlFor="confirmPassword" value="Confirm Password" />
                        <input
                            className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="********"
                            required
                            value={input.confirmPassword}
                            onChange={handleInput}
                        />
                    </div>

                    <button type="submit" className="cyber-button w-full">
                        Create Account
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-cyan-400 hover:text-cyan-300">
                        Sign in
                    </Link>
                </p>
             </div>
</section>
);
};

export default Register;