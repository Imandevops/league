const winner = require('express').Router();
const { createError } = require("../../../../utility/error/errorHandling");
const {wsCreateWinner, wsLoadWinners, wsUpdateWinner, wsDeleteWinner} = require('../compositeServices/winner');
const {validateCreateWinner, validateUpdateWinner, validateDeleteWinner} = require('./validator');
const multer = require('multer');
const { giveBody } = require('../../../../utility/request');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


winner.post('/', upload.fields([{ "name": "pic" }]), async (req, res, next) => {
    try {
        // let bodyObject = JSON.parse(JSON.stringify(req.body));
        // const body = JSON.parse(bodyObject.body);
        const body = giveBody(req);
        // console.log(typeof JSON.parse(req.body.team));
        const { error } = await validateCreateWinner(body);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
            
        }
        const {leagueRound,abb,rank,
            planEnvoy,team} = body;

        const winner = await wsCreateWinner(
            leagueRound,abb,rank,
            planEnvoy,team, req.files.pic);  //pic = array of pictures 

        res.status(200).send(winner);
        next();
    }
    catch (error) { next(error); }
})


winner.get('/', async (req, res, next) => {
    try {        
        const winners = await wsLoadWinners();
        res.send(winners);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);}
})


winner.put('/:winnerId',upload.fields([{ "name": "pic" }]), async (req, res, next) => {
    try {
        // let bodyObject = JSON.parse(JSON.stringify(req.body));
        // const body = JSON.parse(bodyObject.body);
        const body = giveBody(req);
      
        const { error } = await validateUpdateWinner(body, req.params.winnerId);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        const {leagueRound,abb,rank,
            planEnvoy,team} = body;
        const winner = await wsUpdateWinner(req.params.winnerId, leagueRound,abb,rank,
            planEnvoy,team, req.files.pic);
        res.send(winner);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);}
})

winner.delete('/:winnerId', async (req, res, next) => {
    try {
        const body = {};
        body.winnerId = req.params.winnerId;
        const { error } = await validateDeleteWinner(body);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        
        const winner = await wsDeleteWinner(req.params.winnerId);
        res.status(204).send();
        next();
    }
    catch (error) {
        console.log(error);
        next(error);}
})


module.exports = winner;