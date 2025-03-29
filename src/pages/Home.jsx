import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionTitle from "../components/SectionTitle";

const Home = () => {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>Welcome</title>
                <meta name='description' content={t('seo_description')}/>
            </Helmet>

            {/* Header */}
            <Header />

            {/* Main Section */}
            <SectionTitle title='Hello World!'/>

            {/* Footer */}
            <Footer />
        </>
    );
};

export default Home;