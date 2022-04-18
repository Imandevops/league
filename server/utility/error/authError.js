const { createError } = require("./errorHandling");
const { GlobalExceptions } = require("./exceptions");

const authErrorHandling = async (error) => {
    if (error.name == "TokenExpiredError") {
        throw createError(GlobalExceptions.auth.TokenExpired)
    } else if (error.name == "JsonWebTokenError") {
        throw createError(GlobalExceptions.auth.WrongAccessToken)
    } else {
        throw createError(GlobalExceptions.auth.AccessTokenError)
    }
}


module.exports = { authErrorHandling }