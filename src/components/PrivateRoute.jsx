import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = () => {
    // Call the function to get the actual login status

    const isLoggedIn = Cookies.get('isLoggedIn');

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default PrivateRoute;