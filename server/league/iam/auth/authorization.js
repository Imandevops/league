const { createError } = require("../../../utility/error/errorHandling");
const { GlobalExceptions } = require("../../../utility/error/exceptions");



const verifyScopes = (scope, reference) => {
    if (reference === '*' || reference === 'ADMIN' || scope === reference) {
        return true;
    }
    return false;
};

const authorizeRequest = async (req, scope, next) => {
    try {
        let bFlag = false;
        if (req.auth && req.auth?.length > 0) {
            for (let s of req.auth) {
                if (verifyScopes(scope, s)) {  
                    bFlag = true;
                    break;
                }
            }
        }
        if (!bFlag) {
            throw createError(GlobalExceptions.jwt.NotAuthorized);
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { authorizeRequest }
