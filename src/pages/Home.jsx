import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import UsersList from "../components/UsersList";
import LoginForm from "../components/LoginForm";
import Cookies from "js-cookie";

const Home = () => {
  const { t } = useTranslation();


  const isLoggedIn = Cookies.get('isLoggedIn');

  return (
      <>
        <Helmet>
          <title>{t('seo_title')}</title>
          <meta name='description' content={t('seo_description')} />
        </Helmet>

        <Header />

          {isLoggedIn ? (
              <UsersList />
          ) : ( 
              <div className="w-full max-w-2xl m-auto">
                  <LoginForm/>
              </div>
          )}

          <div className="min-h-12"></div>
      </>
  );
};

export default Home;