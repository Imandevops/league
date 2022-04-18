const downloads = require('express').Router();
const { createError } = require("../../../utility/error/errorHandling");
const { wsGetDownloads } = require('../compositServices/downloads');


downloads.get('/', async (req, res, next) => {
    try {
        const downloads = await wsGetDownloads(req);
        return res.status(200).send(downloads);
    }
    catch (error) { 
        console.log(error);
        next(error); }
})


module.exports = downloads;