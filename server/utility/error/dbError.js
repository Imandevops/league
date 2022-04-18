const { createError } = require("./errorHandling");
const { GlobalExceptions } = require("./exceptions");



const dbErrorHandling = async (error) => {
    switch (error.code) {
        case 11000:
            throw createError(GlobalExceptions.db.InputsNotUnique);
        // case '22P02':
        //     throw createError(GlobalExceptions.db.InputNotValide);
        default:
            console.log("dbError", error);
            throw createError(GlobalExceptions.db.DataBaseError);
    }

}

module.exports = { dbErrorHandling }