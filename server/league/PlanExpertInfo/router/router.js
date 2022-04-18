const PlanExpertInfo = require('express').Router();
const { createError } = require("../../../utility/error/errorHandling");
const { wsCreatePlanExpertInfo,wsUpdatePlanExpertInfo ,wsLoadPlanExpertInfo} = require('../compositeServices/PlanExpertInfo');
const { validateCreatePlanExpertInfo,validateUpdatePlanExpertInfo } = require('./validator');
// const { loadFiles, loadFile } = require('../infra/files');
const {  giveBody } = require('../../../utility/request');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


PlanExpertInfo.post('/', async (req, res, next) => {
    try {

        
       
        const body = giveBody(req);
        console.log('kkkkkkkkkkkkkk',body);
        
        const { error } = await validateCreatePlanExpertInfo(body);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        
        const { planUniqueName,planName,
            nameAndFamily, specializedLevel, serviceLocation } = body;

         
          
        const result = await wsCreatePlanExpertInfo(
            planUniqueName,planName,
            nameAndFamily, specializedLevel, serviceLocation); 
        res.status(200).send(result);
        next();
    }
    catch (error) { next(error); }
})


PlanExpertInfo.put('/:planExpertInfoId', async (req, res, next) => {
    try {
        
        
        const body = giveBody(req);
     
        //console.log('wwwwwwwwwww',req.params.planExpertInfoId);
        const { error } = await validateUpdatePlanExpertInfo(body, req.params.planExpertInfoId);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        const {planUniqueName,planName,
            nameAndFamily, specializedLevel, serviceLocation} = body;
        const planExpertInfo = await wsUpdatePlanExpertInfo(req.params.planExpertInfoId, planUniqueName,planName,
            nameAndFamily, specializedLevel, serviceLocation);
        res.send(planExpertInfo);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);}
})



PlanExpertInfo.get('/:planUniqueName', async (req, res, next) => {
    try {        
             
        
        const planExpertInfo = await wsLoadPlanExpertInfo(req.params.planUniqueName)      
              

        res.json(planExpertInfo);
      
        next();
    }
    catch (error) {
       
        next(error); }
})

module.exports = PlanExpertInfo;

