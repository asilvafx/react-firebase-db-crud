import Cookies from 'js-cookie';
import {decryptHash, encryptHash} from './crypto.js';
import DBService from "../data/db.service.js";

export const getUserData = () => {
    const loggedIn = Cookies.get('isLoggedIn') === 'true';
    const uData = Cookies.get('uData');

    if (loggedIn) {
        // Check if uData exists and is not null
        if (uData) {
            try {
                // Attempt to parse the decrypted uData
                const decryptedData = decryptHash(uData);
                return JSON.parse(decryptedData); // Return the parsed data if successful
            } catch (error) {
                // If parsing fails, remove the cookies
                Cookies.remove('isLoggedIn');
                Cookies.remove('uData');
                Cookies.remove('tkn');
            }
        } else {
            // If uData does not exist or is null, remove the cookies
            Cookies.remove('isLoggedIn');
            Cookies.remove('uData');
            Cookies.remove('tkn');
        }
    }
}

export const fetchUserData = async () => {
    const loggedIn = Cookies.get('isLoggedIn') === 'true';
    const uData = Cookies.get('uData');

    if (!loggedIn) {
        return;
    }

    const data = JSON.parse(decryptHash(uData));
    let userid = data?.email || null;

    if (userid) {
        return await DBService.getItemByKeyValue('email', data.email, 'users');
    }

}

export const checkLoginStatus = async () => {
    const loggedIn = Cookies.get('isLoggedIn') === 'true';
    const uData = Cookies.get('uData');
    const tkn = Cookies.get('tkn');

    if (loggedIn && uData && tkn) {
        try {
            const decryptedUData = JSON.parse(decryptHash(uData));
            const decryptedTkn = decryptHash(tkn);

            const userCheck = await DBService.getItemKey('email', decryptedUData.email, 'users');

            if (!userCheck) {
                return false;
            }

            // Check if the token matches the email in uData
            return decryptedTkn === decryptedUData.email;

        } catch (error) {
            console.error("Error checking login status:", error);
            return false; // In case of error, return false
        }
    }
    return false; // Invalid login
};

export const updateData = async (userData) => {
    // Fetch the current token balances
    if (!userData) {
        userData = await getUserData();
    }

    // Prepare the updated data
    const userActualData = await DBService.getItemByKeyValue('email', userData.email, 'users');
    const userKey = await DBService.getItemKey('email', userData.email, 'users');

    const data = {
        ...userActualData,
        uid: userKey
    };

    // Update the user data in the database
    await DBService.update(userKey, data, 'users');

    // Encrypt the updated user data and update the cookie
    const encryptedData = encryptHash(JSON.stringify(data));
    Cookies.set('uData', encryptedData, { path: '', secure: true, sameSite: 'strict' });

    return data;
}