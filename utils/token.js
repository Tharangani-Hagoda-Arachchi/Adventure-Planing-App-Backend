import jwt from "jsonwebtoken"

//create access token
export const createAccessToken = (payload, secret, expiresIn) => {
    return jwt.sign(payload, secret, { expiresIn });
}

//create refresh token
export const createRefreshToken = (payload, secret, expiresIn) => {
    return jwt.sign(payload, secret, { expiresIn });
}

//verify token
export const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
}