import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Cookies from 'js-cookie';
import DBService from './data/db.service';


import Home from './pages/Home';
const Register = lazy(() => import('./pages/Register'));
const Logout = lazy(() => import('./pages/Logout'));
const Login = lazy(() => import('./pages/Login'));

const CookiesWidget = lazy(() => import('./components/CookiesWidget'));
const Loading = lazy(() => import('./components/Loading'));

const App = () => {
    const isLoggedIn = Cookies.get('isLoggedIn');
    const uid = Cookies.get('uid');
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const getUserData = async () => {
            if (isLoggedIn && uid) {
                const fetchedUserData = await DBService.getItemByKeyValue('uid', atob(uid), 'users');

                if (!fetchedUserData) {
                    console.log('Error: Invalid login information.');
                    Cookies.remove('isLoggedIn');
                    Cookies.remove('uid');
                    window.location.href = '/';
                    return;
                }

                setUserData(fetchedUserData);
            }
        };

        getUserData();
    }, [isLoggedIn, uid]); // Dependency array to run effect when isLoggedIn or uid changes

    return (
        <HelmetProvider>
            <Suspense fallback={<Loading />}>
                <Router>
                    <CookiesWidget/>
                    <div className="page-view">
                        <Routes>
                            <Route path="/" element={<Home userData={userData}/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/logout" element={<Logout/>}/>
                            <Route path="*" element={<Home userData={userData}/>}/>
                        </Routes>
                    </div>
                </Router>
            </Suspense>
        </HelmetProvider>
    );
};

export default App;