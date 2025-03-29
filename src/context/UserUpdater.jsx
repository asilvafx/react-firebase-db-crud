
import React, {useEffect, useState} from 'react';
import { getUserData, updateData } from '../lib/user';
import { useUser  } from './UserProvider';
import Cookies from "js-cookie";
import Loading from '../components/Loading';

const UserUpdater = (forceLoading= true) => {
    const { setUserData } = useUser ();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isLoggedIn = Cookies.get('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            setLoading(false);
            return; // Exit if not logged in
        }

        const fetchUserData = async () => {
            const fetchNewData = await getUserData();
            if (!fetchNewData) {
                return;
            }

            const newData = await updateData(fetchNewData);
            setUserData(newData); // Update user data in context
            setLoading(false);
        };

        // Initial fetch
        fetchUserData();

        // Set up interval to update data every 30 seconds
        const intervalId = setInterval(async () => {
            await fetchUserData();
        }, 30000); // 30 seconds

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, [setUserData]); // Add setUser Data to the dependency array

    if(forceLoading && loading){
        return (<Loading />)
    }
    return null; // This component does not render anything
};

export default UserUpdater;