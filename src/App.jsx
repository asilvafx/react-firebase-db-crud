import React, { Suspense, lazy } from 'react';
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

  if(isLoggedIn && uid){
  const getUserData = async () => {
      const userData = await DBService.getItemByKeyValue('uid', atob(uid), 'users');

      if(!userData){
          console.log('Error: Invalid login information.');
          Cookies.remove('isLoggedIn');
          Cookies.remove('uid');
          return;
      }
  }
  getUserData();
  }

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
                    <Route path="/" element={<Home />} />
                    <Route path="/add" element={<Add />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="*" element={<Home />} />
                  </Routes>
                </div>
            </Router>
      </Suspense>
    </HelmetProvider>
  );
};

export default App;
