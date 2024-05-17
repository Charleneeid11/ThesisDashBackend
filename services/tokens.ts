import jwt from 'jsonwebtoken'

const access_secret = process.env.access_secret as jwt.Secret
const refresh_secret = process.env.access_secret as jwt.Secret

export const generateAccessToken = (uid: string) => {
    return jwt.sign({ uid }, access_secret, { expiresIn: '15m' });
};

export const generateRefreshToken = (uid: string) => {
    return jwt.sign({ uid }, refresh_secret, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string) => {
    try {
        return jwt.verify(token, access_secret);
    } catch (error) {
        return null;
    }
};

export const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, refresh_secret);
    } catch (error) {
        return null;
    }
};


