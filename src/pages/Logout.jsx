import React from 'react';
import Cookies from 'js-cookie';
const Logout = () => {

    const isLoggedIn = Cookies.get('isLoggedIn');

    if(isLoggedIn){
        Cookies.remove('isLoggedIn');
        Cookies.remove('uid');
    }

    window.location.href = '/';

    return (
        <div className="w-full max-w-2xl min-h-screen flex flex-col justify-center items-center m-auto">
            Signing out..
        </div>
    );
}

export default Logout;