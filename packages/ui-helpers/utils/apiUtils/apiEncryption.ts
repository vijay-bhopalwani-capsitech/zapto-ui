import CryptoJS from 'crypto-js';

// Validate environment variables
const API_AES_KEY = '8pKcVZbPfR4sD0Xc3QU7zGeWydT2MLkB';
const API_AES_IV = 'Fa8LP4YeST6wRz2M';

/**
 * Encrypts data using AES-256-CBC
 * @param data The data to encrypt (object, string, number, etc.)
 * @returns Encrypted string in Base64 format
 * @throws Error if encryption fails
 */
export const encryptData = (data: unknown, environmentVariables: any): string => {
    try {
        // Convert data to string if it's not already
        const dataString = typeof data === 'string' ? data : JSON.stringify(data);

        const encrypted = CryptoJS.AES.encrypt(dataString, CryptoJS.enc.Utf8.parse(environmentVariables.API_AES_KEY), {
            iv: CryptoJS.enc.Utf8.parse(environmentVariables.API_AES_IV),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        return encrypted.toString();
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Failed to encrypt data');
    }
};

/**
 * Decrypts data encrypted with AES-256-CBC
 * @param encryptedData The encrypted string in Base64 format
 * @returns The decrypted data (parsed to object if possible)
 * @throws Error if decryption fails
 */
export const decryptData = (encryptedData: string, environmentVariables: any): unknown => {
    try {
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Utf8.parse(environmentVariables.API_AES_KEY), {
            iv: CryptoJS.enc.Utf8.parse(environmentVariables.API_AES_IV),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedText) {
            throw new Error('Decryption failed - empty result');
        }

        // Try to parse as JSON, return as-is if not parseable
        try {
            return JSON.parse(decryptedText);
        } catch {
            return decryptedText;
        }
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Failed to decrypt data');
    }
};

// Type guard for encrypted data
export const isEncryptedData = (data: unknown): data is { encryptedData: string } => {
    return typeof data === 'object' && data !== null && 'encryptedData' in data;
};
