import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {useTranslation} from "react-i18next";
import toast from "react-hot-toast";
import { useUser } from '@/context/UserProvider';

const Logout = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const { setUserData } = useUser();

    useEffect(() => {

        Cookies.remove('isLoggedIn');
        Cookies.remove('uData');
        Cookies.remove('tkn');
        setUserData(null);
        toast.success('You have been successfully logged out.');
        navigate('/');
    })

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
};

export default Logout;