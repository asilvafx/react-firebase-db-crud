import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Cookies from 'js-cookie';
import DBService from './data/db.service';

import Home from './pages/Home';
const Add = lazy(() => import('./pages/Add'));
const Logout = lazy(() => import('./pages/Logout'));

const CookiesWidget = lazy(() => import('./components/CookiesWidget'));

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
            <Suspense fallback={<div id="loading">Loading...</div>}>
                <Router
                    future={{
                        v7_startTransition: true,
                        v7_relativeSplatPath: true,
                    }}
                >
                    <CookiesWidget />
                    <div className="page-view">
                        <Routes>
                            <Route path="/" element={<Home userData={userData} />} />
                            <Route path="/add" element={<Add />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="*" element={<Home userData={userData} />} />
                        </Routes>
                    </div>
                </Router>
            </Suspense>
        </HelmetProvider>
    );
};

export default App;