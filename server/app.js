const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const { createError } = require('./utility/error/errorHandling');
const { initializedb } = require('./config/db');
const plan = require('./league/plan/router/router');
const selectedProfiles = require('./league/selectedProfiles/router/router');
const PlanExpertInfo = require('./league/PlanExpertInfo/router/router');
const planUndergraduate = require('./league/planUndergraduate/router/router');
const iam = require('./league/iam/router/router');
const judge = require('./league/context/judge/router/router');
const downloads = require('./league/downloads/router/router');
const winner = require('./league/context/winner/router/router');
const about = require('./league/context/about/router/router');
const news = require('./league/context/news/router/router');
const info = require('./league/context/info/router/router');
const gallery = require('./league/context/gallery/router/router');



const { GlobalExceptions } = require('./utility/error/exceptions');
const { authenticateByJWT } = require('./league/iam/auth/jwt');
const { logger } = require('./utility/logging');

const app = express();
const port = 3001;
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '100mb' }));
app.use(cookieParser());

// app.use("/downloads", express.static(__dirname + '/../profiles'));
app.use('/downloads', express.static('../downloads'));


//---------------------------------------------------------------------------------------
// Authentication -----------------------------------------------------------------------
//---------------------------------------------------------------------------------------
app.use(async (req, _, next) => {
    try {
        logger.info(`[from: ${req.headers.from || req.headers.origin}, method: ${req.method}, url: ${req.url}]`);
        const authHeader = req.header('authtoken');
        if (authHeader) {
            if (authHeader.startsWith('Bearer')) {
                const accessToken = authHeader.substring(7);
                const { user, userScopes } = await authenticateByJWT(accessToken);
                req.auth = userScopes;
                req.user = user;
                logger.info(`[scope: ${req.auth}, user: ${req.user.username}]`);
            } else {
                throw createError(GlobalExceptions.jwt.invalidAuthorizationHeader);
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});

//---------------------------------------------------------------------------------------
// Router -------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------

app.use('/api/league/plan', plan);
app.use('/api/league/selectedProfiles', selectedProfiles);
app.use('/api/league/PlanExpertInfo', PlanExpertInfo);
app.use('/api/league/planUndergraduate', planUndergraduate);
app.use('/api/league/iam', iam);
app.use('/api/league/downloads', downloads);
app.use('/api/league/context/winner', winner);
app.use('/api/league/context/about', about);
app.use('/api/league/context/news', news);
app.use('/api/league/context/judge', judge);
app.use('/api/league/context/info', info);
app.use('/api/league/context/gallery', gallery);

//---------------------------------------------------------------------------------------
// Error Handler ------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
app.use((error, _, res, next) => {
    if (error.isApplicationException) {
        logger.error(`${error.httpStatusCode} ${error.message}`);
        res.status(error.httpStatusCode).json({ code: error.code, message: error.message }); 
    } else {
        res.json({ code: GlobalExceptions.ServiceError.code, message: GlobalExceptions.ServiceError.message });
        logger.error(`${GlobalExceptions.ServiceError.httpStatusCode} ${error.toString()}`);
    }
    next();
});
 
//---------------------------------------------------------------------------------------
// Initialize System --------------------------------------------------------------------
//---------------------------------------------------------------------------------------
initializedb()
    .catch(error => { console.error(`Failed to initialize, error: ${error}`);
     process.exit(1);
    })
    .then(() => { app.listen(port, () => { 
        console.log('Listening on port ' + port + ' ...') });
     });




