import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit';
import { useNavigate } from 'react-router-dom'; 
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { useUser  } from '../context/UserProvider';
import DBService from '../data/db.service';
import { updateData } from '../lib/user';
import worldid_icon from '../assets/worldcoin.svg';

const IDKit = ({ setIsVerified, intern=true,  text='Verify with WorldID'}) => { // Accept setIsVerified as a prop
    const navigate = useNavigate();
    const auth = useAuth();
    const { userData } = useUser ();
    const { t } = useTranslation();
    const [verified, setVerified] = useState(false);

    const WLD_Action = process.env.WLD_ACTION || ""; // Action name
    const WLD_AppId = process.env.WLD_APP_ID || ""; // App ID from Developer Portal
    const WLD_VerificationLevel = process.env.WLD_VERIFICATION_LVL || ""; // Verification level
    const WLD_ServerUrl = process.env.WLD_SERVER_URL || ""; // Server URL

    const handleVerify = async (proof) => {
        try {
            const modifiedProof = {
                ...proof,
                action: WLD_Action // action name you want to use
            };

            const fetchUrl = `${WLD_ServerUrl}?appId=${WLD_AppId}`;

            // Call your API route to verify the proof using axios
            const res = await axios.post(fetchUrl, modifiedProof, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Check if the response is successful
            if (res.status !== 200) {
                throw new Error('Verification failed.');
            }

            const nullifierHash = res.data.data.nullifier_hash; // Accessing nullifier_hash

            // If verification is successful, update the verified state
            await handleVerification(nullifierHash);

        } catch (error) {
            console.error('Error during verification:', error);
            toast.error('Verification failed. Please try again.'); // Inform the user
        }
    };

    const handleVerification = async (proof) => {
        const userKey = userData?.uid;

        const checkIfAlreadyExists = await DBService.getItemByKeyValue('world_id', proof, 'users');

        if(intern){

            if(checkIfAlreadyExists){
                toast.error("Verification failed! World ID already associated to a different account.");
                return;
            }

            const data = {
                is_verified: true,
                world_id: proof
            };

            await DBService.update(userKey, data, 'users');
            await updateData();

            toast.success("Verification successful!");
        } else {
            if(!checkIfAlreadyExists){
                toast.error("Login failed! World ID not found in our records.");
                return;
            }
            const loginPass = await auth.loginWorldId(checkIfAlreadyExists);
            if(loginPass){
                navigate('/dashboard');
            } else {
                toast.error("Login failed. Please try again.");
            }
        }

        setIsVerified(true);
    };

    const onSuccess = () => {
        //console.log(userHash);
    };

    const onError = (error) => {
        console.error('Error during IDKit verification:', error);
        toast.error('An error occurred during verification. Please try again.'); // Inform the user
    };

    return (
            <IDKitWidget
                app_id={WLD_AppId}
                action={WLD_Action}
                false
                verification_level={VerificationLevel.Orb}
                handleVerify={handleVerify}
                onSuccess={onSuccess}
                onError={onError}
            >
                {({ open }) => (
                    <button
                        className="cyber-button bg-neutral-800 flex items-center justify-center gap-2 group"
                        onClick={open}
                    >
                        <img className="pointer-events-none w-auto h-5 filter invert" src={worldid_icon} width={30} height={30} alt="WorldID" />
                        <span>{text}</span>
                    </button>
                )}
            </IDKitWidget>
    );
};

export default IDKit;