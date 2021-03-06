const { GlobalExceptions } = require("./exceptions");

const createError = (error) => {
    error.isApplicationException = true;
    return Object.assign(new Error(), error);
};

const errorHandling = (error, _req, res, next) => {
    if (error.isApplicationException) {
        res.status(error.httpStatusCode).json({ code: error.code, message: error.message });
    } else {
        res.status(GlobalExceptions.ServiceError.httpStatusCode).json({ code: GlobalExceptions.ServiceError.code, message: GlobalExceptions.ServiceError.message });
    }
    next();
}

module.exports = { createError, errorHandling }