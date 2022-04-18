const plan = require('express').Router();
const { createError } = require("../../../utility/error/errorHandling");
const { wsCreatePlan, wsLoadPlan, wsLoadPlans, wsUpdatePlan, wsUpdateAdminCheck, wsCeoCheck, wsLoadPlansPagination } = require('../compositeServices/plan');
const { validateCreatePlan, validateLoadPlans, validateLoadPlan, validateUpdatePlan, validateUpdateCeoCheck, validateUpdateAdminCheck, validateGetFile, validateLoadPlansPagination } = require('./validator');
const { loadFiles, loadFile } = require('../infra/files');
const {  giveBody } = require('../../../utility/request');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


plan.post('/', upload.array("pic", 12), async (req, res, next) => {
    try {
        // let bodyObject = JSON.parse(JSON.stringify(req.body));
        // const body = JSON.parse(bodyObject.body);
        const body = giveBody(req);
        console.log(body);
        const { error } = await validateCreatePlan(body);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        
        const { abb,
            specializedField, planName,
            field, level, leagueCourse,leagueStage, planNature, companyEnvoy,
            innovation, target, description, authors } = body;

          
        const result = await wsCreatePlan(
            abb, specializedField, companyEnvoy, authors,
            planName, field, level, leagueCourse,leagueStage, planNature,
            innovation, target, description, req.files); 
        res.status(200).send(result);
        next();
    }
    catch (error) { next(error); }
})


plan.get('/file', async (req, res, next) => {
    try {
        const { error } = await validateGetFile(req.query);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 2, message: message, httpStatusCode: 400 });
        }
        const { planUniqueName, fileName } = req.query;
        const file = await loadFile(planUniqueName, fileName);
        res.status(200).send(file);
    }
    catch (error) { next(error); }
});

plan.get('/pagination', async (req, res, next) => {
    try {
        const { error } = await validateLoadPlansPagination(req.query)
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 2, message: message, httpStatusCode: 400 }, req);
        }
        const { page, companyName, abb, specializedField, companyEnvoy,
            field, level, leagueCourse,leagueStage, planNature, innovation, status, issuedDate,undergraduateStatus } = req.query;

        const { result, count } = await wsLoadPlansPagination(page, companyName, abb, specializedField, companyEnvoy,
            field, level, leagueCourse,leagueStage, planNature, innovation, status, issuedDate,undergraduateStatus);

        res.set("count", count).status(200).send(result);
        res.status(200).send(result);
        next();
    } catch (error) { next(error); }
});


plan.get('/', async (req, res, next) => {
    try {
        const { error } = await validateLoadPlans(req.query)
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 2, message: message, httpStatusCode: 400 }, req);
        }
        const { companyName, abb, specializedField, companyEnvoy,
            field, level, leagueCourse,leagueStage, planNature, innovation, status, issuedDate } = req.query;

        const result = await wsLoadPlans(companyName, abb, specializedField, companyEnvoy,
            field, level, leagueCourse,leagueStage, planNature, innovation, status, issuedDate);
        res.json(result);
        next();
    } catch (error) { next(error); }
})


plan.get('/:planId', async (req, res, next) => {
    try {        
        const body = {};
        body.planId = req.params.planId;
        const { error } = await validateLoadPlan(body);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 2, message: message, httpStatusCode: 400 });
        }

        
        
        const plan = await wsLoadPlan(req.params.planId)      
       
        plan.files = await loadFiles(plan.planUniqueName);
        if (!plan.files) plan.files = [];

        
        
        res.json(plan);
      
        next();
    }
    catch (error) { next(error); }
})


plan.put('/:planId', upload.array("pic", 12), async (req, res, next) => {
    try {
        // let bodyObject = JSON.parse(JSON.stringify(req.body));
        // const body = JSON.parse(bodyObject.body);

       
        const body = giveBody(req);
        const { error } = await validateUpdatePlan(body, req.params.planId)
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 2, message: message, httpStatusCode: 400 });
        }

        const {
            companyName,
            abb, specializedField, planName,
            field, level, leagueCourse,leagueStage, planNature, companyEnvoy,
            innovation, target, description, authors, status,undergraduateStatus
        } = body;

       

        const plan = await wsUpdatePlan(req.params.planId,
            companyName, abb, specializedField, planName, field, level, leagueCourse,leagueStage, planNature, companyEnvoy, innovation,
            target, description, authors, status,undergraduateStatus, req.files);
        res.status(204).send();
        next();
    }
    catch (error) { next(error); }
})

plan.put('/noFile/:planId', async (req, res, next) => {
    try {
        const body = giveBody(req);

        const { error } = await validateUpdatePlan(body, req.params.planId)
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 2, message: message, httpStatusCode: 400 });
        }
        const {
            companyName,
            abb, specializedField, planName,
            field, level, leagueCourse,leagueStage, planNature, companyEnvoy,
            innovation, target, description, authors, status
        } = body;

        await wsUpdatePlan(req.params.planId,
            companyName, abb, specializedField, planName, field, level, leagueCourse,leagueStage, planNature, companyEnvoy, innovation,
            target, description, authors, status, req.files);
        res.status(204).send();
        next();
    }
    catch (error) { next(error); }
})


plan.put('/ceoCheck/:planId', async (req, res, next) => {
    try {
        const { error } = await validateUpdateCeoCheck(req.body, req.params.planId)
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 2, message: message, httpStatusCode: 400 });
        }
        await wsCeoCheck(req.params.planId, req.body.status);
        res.status(204).send();
        next();
    }
    catch (error) { next(error); }
})

plan.put('/adminCheck/:planId', async (req, res, next) => {
    try {
        const { error } = await validateUpdateAdminCheck(req.body, req.params.planId);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 2, message: message, httpStatusCode: 400 });
        }
        const { identityConfirmation, groupingConfirmation, documentsConfirmation } = req.body;
        const plan = await wsUpdateAdminCheck(req.params.planId, identityConfirmation, groupingConfirmation, documentsConfirmation, context = 'طرح ناقصه -ادمین');
        res.status(204).send();
        next();
    }
    catch (error) { next(error); }
})



module.exports = plan;

