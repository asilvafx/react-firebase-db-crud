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
        <div>Signing out.. </div>
    );
}

export default Logout;