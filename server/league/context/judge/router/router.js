const judge = require('express').Router();

const { createError } = require("../../../../utility/error/errorHandling");
const {wsCreateJudge, wsLoadJudges, wsUpdateJudge, wsDeleteJudge, wsLoadJudge} = require('../compositeServices/judge');
const {validateCreateJudge, validateUpdateJudge, validateDeleteJudge, validateLoadJudge} = require('./validator');
const { giveBody } = require('../../../../utility/request');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


judge.post('/', upload.fields([{ "name": "file" }]), async (req, res, next) => {
    try {
        // let bodyObject = JSON.parse(JSON.stringify(req.body));
        // const body = JSON.parse(bodyObject.body);
        const body = giveBody(req);
        const { error } = await validateCreateJudge(body);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        const {name, position} = body;

        const judge = await wsCreateJudge(
            name, position, req.files.file); 
        
        res.status(200).send(judge);
        next();
    }
    catch (error) { next(error); }
})


judge.get('/', async (req, res, next) => {
    try {
        const judges = await wsLoadJudges();
        res.send(judges);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);}
})

judge.get('/:judgeId', async (req, res, next) => { 
    try {
        const { error } = await validateLoadJudge(req.params.judgeId);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        const judges = await wsLoadJudge(req.params.judgeId);
        res.send(judges);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);}
})


judge.put('/:judgeId', upload.fields([{ "name": "pic" }]), async (req, res, next) => {
    try {
        // let bodyObject = JSON.parse(JSON.stringify(req.body));
        // const body = JSON.parse(bodyObject.body);
        const body = giveBody(req);
        const { error } = await validateUpdateJudge(body, req.params.judgeId);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        const {name, position} = body;
        const judge = await wsUpdateJudge(req.params.judgeId , name, position, req.files.pic);
        res.send(judge);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);}
})

judge.delete('/:judgeId', async (req, res, next) => {
    try {
        const body = {};
        body.judgeId = req.params.judgeId;
        const { error } = await validateDeleteJudge(body);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        
        const judge = await wsDeleteJudge(req.params.judgeId);
        res.send(judge);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);}
})


module.exports = judge;