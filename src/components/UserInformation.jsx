import React, { useState, useRef } from 'react';
import { Button, Card } from 'flowbite-react';
import { FaUserCircle } from 'react-icons/fa';
import Cookies from 'js-cookie';
import DBService from '../data/db.service';

const UserInformation = ({ userData }) => {
    const [imageUrl, setImageUrl] = useState(userData.avatar || ''); // Assuming userData has a photoURL field
    const [loading, setLoading] = useState(false); // State to track loading status
    const fileInputRef = useRef(null); // Create a ref for the file input
    const userId = Cookies.get('uid');
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) { // Check if the file is an image

            setLoading(true); // Set loading to true when starting the upload
            try {
                const downloadURL = await DBService.uploadImage(file, `avatars/${userData.uid}`);
                setImageUrl(downloadURL);
                console.log(downloadURL);
                // Update the user data in the database with the new image URL
                const data = {
                    avatar: downloadURL,
                };
                const fetchedUserKey = await DBService.getItemKey('uid', atob(userId), 'users');

                if (!fetchedUserKey) {
                    console.error("Error fetching user_key!");
                    return;
                }

                DBService.update(fetchedUserKey, data, 'users')
                .then(() => {
                    console.log("Avatar was updated successfully!");
                })
                .catch((e) => {
                    console.log(e);
                });
            } catch (error) {
                console.error("Error uploading image:", error);
            } finally {
                setLoading(false); // Set loading to false after upload completes
            }
        } else {
            alert("Please select a valid image file.");
        }
    };

    const handleChangeAvatarClick = () => {
        fileInputRef.current.click(); // Programmatically click the hidden file input
    };

    return (
        <div className="w-full px-4 mb-8">
            <Card>
                <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
                    <h4 className="text-lg text-gray-500">Personal Information</h4>
                    <span className="text-gray-400 text-sm">{userData.uid}</span>
                </div>
                <div className="flex flex-wrap gap-6 items-center">
                    <div className="relative mr-4 flex flex-col items-center justify-center gap-2">
                        <img
                            src={imageUrl || <FaUserCircle size={50} />}
                            alt={`${userData.displayName} Avatar`}
                            className="w-20 h-20 rounded-full border"
                        />
                        {loading && (
                            <div className="absolute top-0 flex items-center justify-center bg-black bg-opacity-50 h-20 w-20 rounded-full">
                                <div className="loader"></div> {/* Loader animation */}
                            </div>
                        )}

                        <Button color="light" size="sm" className="mr-2" onClick={handleChangeAvatarClick}>
                            Change Avatar
                        </Button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="font-bold">{userData.displayName}</span>
                        <span>{userData.email}</span>
                        <span>Role: {userData?.isAdmin ? 'Admin' : 'User '}</span>
                    </div>
                </div>
                <div>
                    <input
                        accept="image/*"
                        type="file"
                        id="image-upload"
                        style={{ display: 'none' }}
                        ref={fileInputRef} // Attach the ref to the input
                        onChange={handleImageChange}
                    />
                </div>
            </Card>
            <style>{`
                .loader {
                    border: 4px solid rgba(255, 255, 255, 0.3);
                    border-top: 4px solid white;
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default UserInformation;