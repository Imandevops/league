const { GlobalExceptions } = require("../../../utility/error/exceptions");
const { createError } = require("../../../utility/error/errorHandling");
const { getDownloads } = require("../atomicServices/downloads");
const { statuses } = require("../../../utility/statuses");


const wsGetDownloads = async (req) => {
    const downloads = await getDownloads(req);
    return downloads;
}



module.exports = { wsGetDownloads }