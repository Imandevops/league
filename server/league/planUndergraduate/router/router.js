const planUndergraduate = require('express').Router();
const { createError } = require("../../../utility/error/errorHandling");
const { wsCreatePlanUndergraduate,wsLoadPlanUndergraduate,wsUpdatePlanUndergraduate} = require('../compositeServices/planUndergraduate');
const { validateCreatePlanUndergraduate,validateUpdatePlanUndergraduate } = require('./validator');
// const { loadFiles, loadFile } = require('../infra/files');
const {  giveBody } = require('../../../utility/request');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


planUndergraduate.post('/', async (req, res, next) => {
    try {

        
       
        const body = giveBody(req);
                
        
        const { error } = await validateCreatePlanUndergraduate(body);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        
        const { planUniqueName, planName, innovativeAspects,innovativeAspectsScore, newTopic,newTopicScore, scientificValue,scientificValueScore,
            explainable,explainableScore,scalability,scalabilityScore,finalScore,finalOpinion } = body;

      

        const result = await wsCreatePlanUndergraduate(
            planUniqueName, planName, innovativeAspects,innovativeAspectsScore, newTopic,newTopicScore, scientificValue,scientificValueScore,
            explainable,explainableScore,scalability,scalabilityScore,finalScore,finalOpinion); 
        res.status(200).send(result);
        next();
    }
    catch (error) { next(error); }
})


planUndergraduate.put('/:planUndergraduateId', async (req, res, next) => {
    try {
        
        
        const body = giveBody(req);
     
        
        const { error } = await validateUpdatePlanUndergraduate(body, req.params.planUndergraduateId);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }

        
        const {planUniqueName, planName, innovativeAspects,innovativeAspectsScore, newTopic,newTopicScore, scientificValue,scientificValueScore,
            explainable,explainableScore,scalability,scalabilityScore,finalScore,finalOpinion } = body;

        const planUndergraduate = await wsUpdatePlanUndergraduate(req.params.planUndergraduateId, planUniqueName,planName,
            innovativeAspects,innovativeAspectsScore, newTopic,newTopicScore, scientificValue,scientificValueScore,
            explainable,explainableScore,scalability,scalabilityScore,finalScore,finalOpinion);

        res.send(planUndergraduate);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);}
})



planUndergraduate.get('/:planUniqueName', async (req, res, next) => {
    try {        
             
       
        const planUndergraduate = await wsLoadPlanUndergraduate(req.params.planUniqueName)      
              
        // console.log('kkkkkkkkkkkkkkkkkkk',planUndergraduate);
        res.json(planUndergraduate);
      
        
        next();
    }
    catch (error) {
       
        next(error); }
})

module.exports = planUndergraduate;

