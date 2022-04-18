const gallery = require('express').Router();

const { createError } = require("../../../../utility/error/errorHandling");
const {wsCreateGallery, wsLoadGallery, wsUpdateGallery, wsDeleteGallery, wsGetLastGallery} = require('../compositeServices/gallery');
const {validateCreateGallery, validateUpdateGallery, validateDeleteGallery} = require('./validator');
const { giveBody } = require('../../../../utility/request');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


gallery.post('/', upload.fields([{ "name": "pic" }]), async (req, res, next) => {
    try {
        const body = giveBody(req);
        const { error } = await validateCreateGallery(body);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        const {context, round} = body;

        const gallery = await wsCreateGallery(
            context, round, req.files.pic);  //pic = array of pictures 
        
        res.status(200).send(gallery);
        next();
    }
    catch (error) { next(error); }
})


gallery.get('/', async (req, res, next) => {
    try {
        const gallery = await wsLoadGallery();
        res.send(gallery);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);}
})


gallery.get('/last', async (req, res, next) => {
    try {
        const gallery = await wsGetLastGallery();
        res.send(gallery);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);}
})


gallery.put('/:galleryId', upload.fields([{ "name": "pic" }]), async (req, res, next) => {
    try {
        // let bodyObject = JSON.parse(JSON.stringify(req.body));
        // const body = JSON.parse(bodyObject.body);
        const body = giveBody(req);
        const { error } = await validateUpdateGallery(body, req.params.galleryId);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        const {context, round} = body;
        const gallery = await wsUpdateGallery(req.params.galleryId , context, round, req.files?.pic);
        res.send(gallery);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);}
})

gallery.delete('/:galleryId', async (req, res, next) => {
    try {
        const body = {};
        body.galleryId = req.params.galleryId;
        const { error } = await validateDeleteGallery(body);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        
        const gallery = await wsDeleteGallery(req.params.galleryId);
        res.status(204).send();
        next();
    }
    catch (error) {
        console.log(error);
        next(error);}
})



module.exports = gallery;