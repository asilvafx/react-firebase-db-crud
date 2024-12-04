import React, {useEffect, useState} from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Cookies from "js-cookie";
import Header from '../components/Header';
import UsersList from "../components/UsersList";
import LoginForm from "../components/LoginForm";
import UserInformation from "../components/UserInformation";

const Home = ({ userData }) => { // Correctly destructure userData from props
    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);
    const isLoggedIn = Cookies.get('isLoggedIn');

    useEffect(() => {
        // Check if userData is not empty
        if (Object.keys(userData).length > 0) {
            setLoading(false);
        }
    }, [userData]); // Add userData to the dependency array

    if (loading) {
        return (
            <div className="w-full max-w-2xl min-h-screen flex items-center justify-center mx-auto px-4">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{t('seo_title')}</title>
                <meta name='description' content={t('seo_description')} />
            </Helmet>

            <Header />

            {isLoggedIn ? (
                <>
                    <UserInformation userData={userData} />

                    {userData?.isAdmin === true && ( // Check if user is admin
                        <UsersList />
                    )}

                </>
            ) : (
                <div className="w-full max-w-2xl m-auto">
                    <LoginForm />
                </div>
            )}

            <div className="min-h-12"></div>
        </>
    );
};

export default Home;