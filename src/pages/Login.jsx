import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import LoginForm from "../components/LoginForm";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { t } = useTranslation();
    const isLoggedIn = Cookies.get('isLoggedIn');
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]); // Add dependencies to the effect

    return (
        <>
            <Helmet>
                <title>{t('seo_title')}</title>
                <meta name='description' content={t('seo_description')} />
            </Helmet>

            <Header />

            <LoginForm />
        </>
    );
};

export default Login;