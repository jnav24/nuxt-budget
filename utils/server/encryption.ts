import { compareSync, hashSync } from 'bcrypt';
import CryptoJS from 'crypto-js';

const config = useRuntimeConfig();

const saltRounds = 10;

export const decryptAES = (encryption: string) => {
    const bytes = CryptoJS.AES.decrypt(encryption, config.ENCRYPT_SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
};

export const encryptWithAES = (value: string) =>
    CryptoJS.AES.encrypt(value, config.ENCRYPT_SECRET).toString();

export const hashPassword = (password: string) => hashSync(password, saltRounds);

export const hashWithSha256 = (message: string) =>
    CryptoJS.SHA256(`${message}|${config.HASH_KEY}`).toString();

export const verifyPassword = (password: string, hashedPassword: string) =>
    compareSync(password, hashedPassword);
