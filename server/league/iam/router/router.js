const { wsRegister, wsLogin, wsLoadUser, wsLoadUserById, wsUpdateUser, wsResetPass } = require('../compositeServices/iam');
const { validateRegister, validateLogin, validateLoadUser, validateLoadUserById, validateUpdateUser, validateResetPass } = require('./validator');
const { createError } = require('../../../utility/error/errorHandling');
const { authorizeRequest } = require('../auth/authorization');
const { giveBody } = require('../../../utility/request');
const iam = require('express').Router();
const multer = require('multer');
const { string } = require('joi');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

iam.post('/register', upload.fields([{ "name": "file" }]), async (req, res, next) => {
    try {
        // let bodyObject = JSON.parse(JSON.stringify(req.body));
        // const body = JSON.parse(bodyObject.body);
        const body = giveBody(req);
        const { error } = await validateRegister(body); //req.body
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        const { name, family, sex, age, graduation, graduationField,
            nationalId, personnelId, companyName, organizationLevel, mobile, email,type,
            username, password } = body;
        let user = await wsRegister(name, family, sex, age, graduation, graduationField, nationalId, personnelId, companyName, organizationLevel, mobile, email,type ,username, password, req.files.file); //req.files.file
        res.json(user);
        next();
    } catch (error) { next(error);}
});

iam.post('/login', async (req, res, next) => {
    try {
        const { error } = await validateLogin(req.body);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 }, req);
        }
        const { username, password, refreshToken } = req.body;
        
        const { token, refToken, result } = await wsLogin(username, password, refreshToken);
        res.set("authtoken", token).set("authrefreshtoken", refToken).json(result);
        next();
    } catch (error) { next(error); }
});


// iam.get('/loadUsers', (req, _, next) => authorizeRequest(req, 'ADMIN', next), async (req, res, next) => {
iam.get('/loadUsers', async (req, res, next) => {
    try {
        const { error } = await validateLoadUser(req.query)
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        const { name, family, sex, graduation, nationalId, personnelId, companyName, username } = req.query;
        let user = await wsLoadUser(name, family, sex, graduation, nationalId, personnelId, companyName, username);
        res.json(user);
        next();
    } catch (error) { next(error); }
});

iam.get('/loadUser/:userId', async (req, res, next) => {
    try {
        const { error } = await validateLoadUserById(req.params)
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        let user = await wsLoadUserById(req.params.userId);
        res.json(user);
        next();
    } catch (error) { 
        next(error); }
});


iam.put('/updateUser/:userId', upload.fields([{ "name": "file" }]), async (req, res, next) => {
    try {
        // let bodyObject = JSON.parse(JSON.stringify(req.body));
        // const body = JSON.parse(bodyObject.body);
        const body = giveBody(req);
        const { error } = await validateUpdateUser(body, req.params.userId)
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        const { name, family, sex, age, graduation, graduationField,
            nationalId, personnelId, companyName, organizationLevel, mobile, email,type,
            username, password } = body; //req.body
        const user = await wsUpdateUser(req.params.userId, name, family, sex, age, graduation, graduationField,
            nationalId, personnelId, companyName, organizationLevel, mobile, email,type,
            username, password, req.files.file);
        res.json(user);
        next();
    } catch (error) { 
        console.log(error);
        next(error); }
});


iam.put('/resetpass/:username', async (req, res, next) => {
    try {
        const { error } = await validateResetPass(req.params.username);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 2, message: message, httpStatusCode: 400 });
        }
        await wsResetPass(req.params.username);
        res.status(204).send();
        next();
    }
    catch (error) { next(error); }
})




module.exports = iam;