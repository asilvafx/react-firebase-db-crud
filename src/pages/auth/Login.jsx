import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from 'flowbite-react';
import Cookies from 'js-cookie';
import { useAuth } from '@/context/AuthProvider';
import Loading from "@/components/Loading";
import GoBack from "@/components/GoBack";
import IDKit from '@/components/IDKit';
import logo_icon from "@/assets/vite.svg";

const Login = () => {
    const isLoggedIn = Cookies.get('isLoggedIn');
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn){
            navigate('/dashboard');
        }
    }, [navigate, isLoggedIn]);

    const [isVerified, setIsVerified] = useState(false); // Manage verification state here
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [rememberMe, setRememberMe] = useState(false); // State for remember me checkbox
    const auth = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (formData.username === "" || formData.password === "") {
            setError("Login failed. Invalid credentials.");
            return;
        }
        const response = await auth.loginAction(formData);
        if (response === true) {
            navigate('/dashboard');
        } else {
            setError(response || "Login failed. Please try again.");
        }
    };

    if(isLoggedIn){
        return (<Loading />)
    }

    return (
        <section className="w-full max-w-lg min-h-screen mx-auto flex flex-col items-center justify-center my-10">

            <div className="w-full flex justify-start mb-6">
                <GoBack url="/" text="Go Back" noStyle={true}/>
            </div>

            <div className="w-full premium-panel p-4 md:p-8 rounded-xl">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <img className="h-12 w-auto filter !invert" alt="Logo" width={80} height={80} src={logo_icon}/>
                    </div>
                    <h1 className="text-2xl font-bold neon-text mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to your CyberChest account</p>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="username" value="Email" className="text-gray-300 mb-2"/>
                        <input
                            className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                            id="username"
                            type="email"
                            placeholder="example@yahoo.com"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="password" value="Password" className="text-gray-300 mb-2"/>
                        <input
                            className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                            id="password"
                            type="password"
                            placeholder="********"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-500"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)} // Toggle remember me state
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                                Remember me
                            </label>
                        </div>
                        <Link to="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300">
                            Forgot password?
                        </Link>
                    </div>

                    <button type="submit" className="cyber-button w-full">
                        Sign in
                    </button>
                </form>
                <div className="grid mt-6">
                    <IDKit setIsVerified={setIsVerified} intern={false} text="Sign in with WorldID" />
                </div>


                <p className="mt-6 text-center text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-cyan-400 hover:text-cyan-300">
                        Create one
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Login;