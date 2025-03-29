import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.SECRET_KEY || 'your-default-secret-key'; // Secure key management

export const encryptHash = (password) => {
    return CryptoJS.AES.encrypt(password, secretKey).toString();
};

export const decryptHash = (encryptedPassword) => {
    let bytes = "";
    try {
        const decrypt = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
        bytes = decrypt.toString(CryptoJS.enc.Utf8);
    } catch (e) {
        bytes = e;
    }
    return bytes;
};
