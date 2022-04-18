const jwt = require('jsonwebtoken');
const authConfig = require('../../../config/authConfig');
const { authErrorHandling } = require('../../../utility/error/authError');
const { createError } = require('../../../utility/error/errorHandling');
const { GlobalExceptions } = require('../../../utility/error/exceptions');
const { isUsernameExists } = require('../atomicServices/iam');


// const getJwtPrivateKey = async () => {

// }

const createToken = async (username, userId) => {
    let data = {
        username, userId
    }
    return {
        token: jwt.sign(data, authConfig.jwtPrivateKey, { expiresIn: '1m' }),
        refreshToken: jwt.sign(data, authConfig.jwtPrivateKey, { expiresIn: '1000m' })
    }
}

const authenticateByJWT = async (accessToken) => {
    try {
        const decoded = jwt.verify(accessToken, authConfig.jwtPrivateKey);
        if (!decoded) {
            throw createError(GlobalExceptions.jwt.NotAuthorized)
        }
        const user = await isUsernameExists( decoded.username);
        if (user === null) {
            throw createError(GlobalExceptions.jwt.NotAuthorized)
        }
        let userScopes = user.authorities;
        userScopes.push('*');
        return { user, userScopes };
    } catch (error) {
        await authErrorHandling(error)
    }
}

const verifyRefreshToken = async (username, refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, authConfig.jwtPrivateKey);
        if (!decoded) {
            throw createError(GlobalExceptions.jwt.NotAuthorized)
        }
        if (decoded.username !== username) {
            throw createError(GlobalExceptions.jwt.NotAuthorized)
        }
        return true;
    } catch (error) {
        await authErrorHandling(error)
    }
}

module.exports = { createToken, authenticateByJWT, verifyRefreshToken }