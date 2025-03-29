import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useUser  } from '../context/UserProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WorldIDVerification from '../components/WorldIDVerification';
import Loading from '../components/Loading';
import SectionTitle from "../components/SectionTitle";

const Dashboard = () => {
    const { userData } = useUser ();

    const { t } = useTranslation();

    // If userData is not available, show the loading component
    if (!userData) {
        return <Loading />;
    }

    return (
        <>
            <Helmet>
                <title>Dashboard</title>
                <meta name='description' content={t('seo_description')}/>
            </Helmet>

            <Header/>

            <SectionTitle title='Dashboard'/>

            {!userData?.is_verified && (
                <WorldIDVerification/>
            )}

            <Footer/>
        </>
    );
};

export default Dashboard;