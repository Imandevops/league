const selectedProfiles = require('express').Router();
const { validateCreateSelectedProfile, validateDeleteSelectedProfile, validateUpdateSelectedProfile } = require('./validator');
const {  giveBody } = require('../../../utility/request');
const { createError } = require("../../../utility/error/errorHandling");
const { wsCreateSelectedProfiles, wsLoadSelectedProfiles, wsLoadSelectedProfilesById, wsUpdateSelectedProfiles, wsDeleteSelectedProfile,wsLoadSelectedProfilesSearch } = require('../compositeServices/selectedProfiles');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

selectedProfiles.post('/', upload.array("pic", 12), async (req, res, next) => {
    try {
       
       
        const body = giveBody(req);
        
        const { error } = await validateCreateSelectedProfile(body);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }

        const { name,family, lastEducationalCertificate,companyName,
            organizationLevel, startDate, summeryExecutiveRecords
            , 
            designsProvidedList 
        } = body;

         
        
        const result = await wsCreateSelectedProfiles(
            name,family, lastEducationalCertificate,companyName,
            organizationLevel, startDate, summeryExecutiveRecords
            , 
            designsProvidedList
            , req.files); 
        res.status(200).send(result);
        next();
    }
    catch (error) { next(error); }
})


selectedProfiles.get('/', async (req, res, next) => {
    try {
        
        const selectedProfiles = await wsLoadSelectedProfiles();
       
        res.send(selectedProfiles);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);}
})
selectedProfiles.get('/search', async (req, res, next) => {
    try {
        
       
        const { courseTitle,nature } = req.query;

       
        const result = await wsLoadSelectedProfilesSearch(courseTitle,nature);
        res.json(result);
        next();
    } catch (error) { next(error);}
})

// selectedProfiles.get('/search', async (req, res, next) => {
    
//     try {
        
//         const { name,family } = req.query;
//         const result = await wsLoadSelectedProfilesSearch(name,family);
//         const result = await wsLoadSelectedProfilesSearch(name,family);
//         res.json(result);
//         next();
//     }
//     catch (error) { next(error); }
// });

selectedProfiles.get('/:Id', async (req, res, next) => {
    try {
        // const { error } = await validateLoadNewsById(req.params);
        // if (error) {
        //     const { details } = error;
        //     const message = details.map(i => i.message).join(',');
        //     throw createError({ code: 1, message: message, httpStatusCode: 400 });
        // }
        
        const selectedProfiles = await wsLoadSelectedProfilesById(req.params.Id);
        
        res.status(200).send(selectedProfiles);
       
    }
    catch (error) { next(error); }
})






selectedProfiles.put('/:Id',upload.array("pic", 12), async (req, res, next) => {
    try {
        // let bodyObject = JSON.parse(JSON.stringify(req.body));
        // const body = JSON.parse(bodyObject.body);
        const body = giveBody(req);
        const { error } = await validateUpdateSelectedProfile(body, req.params.Id);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
      
        const {name,family, lastEducationalCertificate,companyName,
            organizationLevel, startDate, summeryExecutiveRecords
            , 
            designsProvidedList } = body;
        const selectedProfiles = await wsUpdateSelectedProfiles(req.params.Id, name,family, lastEducationalCertificate,companyName,
            organizationLevel, startDate, summeryExecutiveRecords, designsProvidedList,  req.files);
        res.send(selectedProfiles);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);}
})

selectedProfiles.delete('/:Id', async (req, res, next) => {
    try {
        
        const body = {};
        body.Id = req.params.Id;
        const { error } = await validateDeleteSelectedProfile(body);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        
        const selectedProfiles = await wsDeleteSelectedProfile(req.params.Id);
        res.status(204).send();
        next();
    }
    catch (error) {
        console.log(error);
        next(error);}
})

module.exports = selectedProfiles;
