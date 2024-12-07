import React from 'react';
import { DarkThemeToggle } from "flowbite-react";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const Header = () => {

    const isLoggedIn = Cookies.get('isLoggedIn');

    return (
        <>
        <header>
            <nav
                className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"/>
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Realtime Database + CRUD</span>
                    </Link>

                    <div className="flex md:order-2 space-x-3 md:space-x-2 rtl:space-x-reverse h-[36px]">
                        <DarkThemeToggle className="btn text-alt hover:bg-alt focus:ring-0"/>
                        {isLoggedIn ? (
                            <Link to="/logout"
                                  className="btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Logout
                            </Link>
                        ) : (
                            <Link to="/login"
                                  className="btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Sign in
                            </Link>
                        )}

                    </div>
                </div>
            </nav>

            <div className="min-h-24 w-full"></div>


        </header>
        </>
    );
}

export default Header;