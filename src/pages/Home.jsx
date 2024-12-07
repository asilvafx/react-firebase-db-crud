import React, {useEffect, useState} from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Cookies from "js-cookie";
import Header from '../components/Header';
import UsersList from "../components/UsersList";
import UserInformation from "../components/UserInformation";
import Loading from "../components/Loading";

const Home = ({ userData }) => { // Correctly destructure userData from props

    const { t } = useTranslation();

    useEffect(() => {
        const sendMessage = async () => {
            const accountSid = 'ACf65d5037f835d7be0ba555e84e8382ac';
            const authToken = '75b50ed34fa32fddb3413c7d0c6fe426';
            const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

            const data = new URLSearchParams({
                Body: 'Hey this is just a test',
                From: '+17856294635',
                To: '+33610291986'
            });

            const headers = new Headers();
            headers.append('Authorization', 'Basic ' + btoa(`${accountSid}:${authToken}`));
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: data
                });

                if (!response.ok) {
                    throw new Error('Error sending message');
                }

                const result = await response.json();
                console.log(result.sid);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        };

        //sendMessage();
    }, []);

    const [loading, setLoading] = useState(true);
    const isLoggedIn = Cookies.get('isLoggedIn');

    useEffect(() => {
        if(isLoggedIn){
            // Check if userData is not empty
            if (Object.keys(userData).length > 0) {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, [userData]); // Add userData to the dependency array


    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <>
            <Helmet>
                <title>{t('seo_title')}</title>
                <meta name='description' content={t('seo_description')} />
            </Helmet>

            <Header />
            <div className="w-full px-4">

            {isLoggedIn ? (
                <>
                    <UserInformation userData={userData} />

                    {userData?.isAdmin === true && ( // Check if user is admin
                        <UsersList />
                    )}

                </>
            ) : (
                <div className="w-full max-w-2xl m-auto">
                  Please sign in to your account or create a new account.
                </div>
            )}
            </div>

        </>
    );
};

export default Home;