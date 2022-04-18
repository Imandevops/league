const info = require('express').Router();

const { createError } = require("../../../../utility/error/errorHandling");
const {wsCreateInfo, wsLoadInfo, wsUpdateInfo, wsDeleteInfo} = require('../compositeServices/info');
const {validateCreateInfo, validateUpdateInfo, validateDeleteInfo} = require('./validator');
const { giveBody } = require('../../../../utility/request');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


info.post('/', upload.fields([{ "name": "pic" }]), async (req, res, next) => {
    try {
        // let bodyObject = JSON.parse(JSON.stringify(req.body));
        // const body = JSON.parse(bodyObject.body);
        const body = giveBody(req);
        const { error } = await validateCreateInfo(body);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        const {context} = body;

        const info = await wsCreateInfo(
            context, req.files.pic);  //pic = array of pictures 
        
        res.status(200).send(info);
        next();
    }
    catch (error) { next(error); }
})


info.get('/:infoId', async (req, res, next) => {
    try {
        const info = await wsLoadInfo(req.params.infoId);
        res.send(info);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);}
})

info.get('/', async (req, res, next) => {
    try {
        const info = await wsLoadInfo();
        res.send(info);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);}
})


info.put('/:infoId', upload.fields([{ "name": "pic" }]), async (req, res, next) => {
    try {
        // let bodyObject = JSON.parse(JSON.stringify(req.body));
        // const body = JSON.parse(bodyObject.body);
        const body = giveBody(req);
        const { error } = await validateUpdateInfo(body, req.params.infoId);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        const {context} = body;
        const info = await wsUpdateInfo(req.params.infoId , context, req.files.pic);
        res.send(info);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);}
})

info.delete('/:infoId', async (req, res, next) => {
    try {
        const body = {};
        body.infoId = req.params.infoId;
        const { error } = await validateDeleteInfo(body);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        
        const info = await wsDeleteInfo(req.params.infoId);
        res.status(204).send();
        next();
    }
    catch (error) {
        console.log(error);
        next(error);}
})



module.exports = info;