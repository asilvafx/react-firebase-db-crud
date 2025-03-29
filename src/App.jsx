import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { checkLoginStatus, getUserData, updateData } from './lib/user';
import AuthProvider from "./context/AuthProvider";
import { UserProvider } from './context/UserProvider';
import UserUpdater from './context/UserUpdater';

/*
    Import Components
*/
const Loading = lazy(() => import('./components/Loading'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const CookiesGDPR = lazy(() => import('./components/Cookies'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));


/*
    Import Pages
*/
import Home from './pages/Home';

const Dashboard = lazy(() => import('./pages/Dashboard'));

const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const Logout = lazy(() => import('./pages/auth/Logout'));

/*
    Load App Router
*/
const App = () => {

    useEffect(() => {
        async function fetchLoginStatus() {
            const isLoggedIn = await checkLoginStatus();
            if (isLoggedIn) {
                const userData = await getUserData();
                if(userData){
                await updateData(userData);
                }
            }
        }
        fetchLoginStatus();
    }, []);

    return (
        <HelmetProvider>
            <Suspense fallback={<Loading />}>
                <Router>
                    <ScrollToTop />
                    <Toaster toastOptions={{
                        className: '!text-neutral-200 !bg-neutral-950 premium-border',
                        success: {
                            className: '!text-green-200 !bg-neutral-900 premium-border',
                        },
                        error: {
                            className: '!text-red-200 !bg-neutral-900 premium-border',
                        },
                    }} />
                    <UserProvider>
                        <AuthProvider>
                            <UserUpdater/>
                            <CookiesGDPR/>

                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route element={<PrivateRoute/>}>

                                    <Route path="/dashboard" element={<Dashboard/>}/>
                                    <Route path="/logout" element={<Logout/>}/>
                                </Route>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>
                                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                                <Route path="/reset-password" element={<ResetPassword/>}/>
                                <Route path="*" element={<Home/>}/>
                            </Routes>

                        </AuthProvider>
                    </UserProvider>
                </Router>
            </Suspense>
        </HelmetProvider>
    );
};

export default App;