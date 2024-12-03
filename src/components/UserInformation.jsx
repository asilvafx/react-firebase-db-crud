import React from 'react';

const UserInformation = ({ userData }) => {
    
    return (
        <div className="w-full px-4 mb-8">
            <div className="w-full border p-8">
                <h4 className="text-lg text-gray-500 mb-4">Personal Information</h4>
                <p>UID: {userData.uid}</p>
                <p>Account Name: {userData.displayName}</p>
                <p>Email: {userData.email}</p>
                <p>Role: {userData.isAdmin ? 'Admin' : 'User'}</p>
            </div>

        </div>
    );
}

export default UserInformation;