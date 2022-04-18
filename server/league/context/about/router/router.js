const about = require('express').Router();
const { wsLoadAbout, wsCreateAbout, wsUpdateAbout, wsCreateAboutPic, wsLoadAboutPic, wsUpdateAboutPic, wsDeleteAbout, wsLoadAllAboutPic, wsLoadLastAbout ,wsDeleteAboutPicture} = require('../compositeServices/about');
const { validateCreateAbout, validateLoadAbout, validateUpdateAbout,validateDeleteAbout } = require('./validator');
const { createError } = require('../../../../utility/error/errorHandling');
const { giveBody } = require('../../../../utility/request');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


about.post('/text', async (req, res, next) => {
    try {
        const { error } = await validateCreateAbout(req.body);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        const { aboutText } = req.body;
        const about = await wsCreateAbout(aboutText);
        res.status(200).send(about);
        next();
    }
    catch (error) { next(error); }
})


about.get('/text', async (req, res, next) => {
    const { round } = req.query;
    try {
        const about = await wsLoadAbout(round);
        res.status(200).send(about);
        next();
    }
    catch (error) { next(error); }
})


about.put('/text', async (req, res, next) => {
    try {
        const { error } = await validateUpdateAbout(req.body);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        const  oldRound  = req.query.round;
        const { aboutText, round } = req.body;
        await wsUpdateAbout(oldRound, aboutText, round)
        res.status(204).send();
        next();
    }
    catch (error) { next(error); }
})


about.delete('/text', async (req, res, next) => {
    const { round } = req.query;
    
    try {
        await wsDeleteAbout(round);
        res.status(204).send();
        next();
    }
    catch (error) { 
        next(error); }
})


about.post('/picture', upload.fields([{ "name": "pic" }]), async (req, res, next) => {
    try {
        const result = await wsCreateAboutPic(req.files.pic);
        res.status(200).send(result);
        next();
    }
    catch (error) { next(error); }
})


about.get('/picture/:round', async (req, res, next) => {
    try {
        const file = await wsLoadAboutPic(req.params.round);
        res.status(200).send(file);
    }
    catch (error) { next(error); }
})


about.get('/picture', async (req, res, next) => {
    try {
        const images = await wsLoadAllAboutPic();
        res.status(200).send(images);
    }
    catch (error) { next(error); }
})


about.put('/picture/:round', upload.fields([{ "name": "pic" }]), async (req, res, next) => {
    try {
        const result = await wsUpdateAboutPic(req.files.pic, req.params.round);
        res.status(204).send();
        next(); 
    }
    catch (error) { next(error); }
})


about.get('/last', async (req, res, next) => {
    try {
        const about = await wsLoadLastAbout();
        res.status(200).send(about);
        next();
    }
    catch (error) { 
        console.log("fooo",  error);
        next(error); }
})


about.delete('/picture', async (req, res, next) => {
    try {

        const { round } = req.query;
    
                    
        const about = await wsDeleteAboutPicture(round);
        res.status(204).send();
        next();
    }
    catch (error) {
        console.log(error);
        next(error);}
})




module.exports = about;