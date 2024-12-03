import React from 'react';

const UserInformation = ({ userData }) => {
    const userId = userData.uid; // Access uid from userData

    return (
        <div className="w-full flex flex-col px-4 mb-8">
            <p>UID: {userId}</p>
            <p>Account Name: {userData.displayName}</p>
        </div>
    );
}

export default UserInformation;