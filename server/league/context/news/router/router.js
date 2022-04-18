const news = require('express').Router();
const { createError } = require('../../../../utility/error/errorHandling');
const multer = require('multer');
const { wsCreateNews, wsLoadNewsById, wsUpdateNews, wsDeleteNews, wsLoadNews, wsLoadNewsSlider } = require('../compositeServices/news');
const { validateCreateNews, validateUpdateNews, validateLoadNewsById, validateDeleteNews } = require('./validator');
const { giveBody } = require('../../../../utility/request');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


news.post('/', upload.fields([{ "name": "pic" }]), async (req, res, next) => {
    try {
        // let bodyObject = JSON.parse(JSON.stringify(req.body));
        // const body = JSON.parse(bodyObject.body);
        const body = giveBody(req);
        const { error } = await validateCreateNews(body);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        const { newsTitle, newsText, newsDate } = body;

        const news = await wsCreateNews(newsTitle, newsText, newsDate, req.files.pic);

        res.status(200).send(news);
    }
    catch (error) { 
        next(error); 
    }
})

news.put('/:newsId', upload.fields([{ "name": "pic" }]), async (req, res, next) => {
    try {
        // let bodyObject = JSON.parse(JSON.stringify(req.body));
        // const body = JSON.parse(bodyObject.body);
        const body = giveBody(req);
        const { error } = await validateUpdateNews(body, req.params.newsId);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        const { newsTitle, newsText, newsDate } = body;
        await wsUpdateNews(req.params.newsId, newsTitle, newsText, newsDate, req.files.pic);
        res.status(204).send();
    }
    catch (error) { next(error); }
})

news.get('/', async (req, res, next) => {
    try {
        const news = await wsLoadNews();
        res.status(200).send(news);
    }
    catch (error) { next(error); }
})


news.get('/slider', async (req, res, next) => {
    try {
        const news = await wsLoadNewsSlider();
        res.status(200).send(news);
    }
    catch (error) { next(error); }
})


news.get('/:newsId', async (req, res, next) => {
    try {
        const { error } = await validateLoadNewsById(req.params);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        const news = await wsLoadNewsById(req.params.newsId);
        res.status(200).send(news);
    }
    catch (error) { next(error); }
})

news.delete('/:newsId', async (req, res, next) => {
    try {
        const { error } = await validateDeleteNews(req.params);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            throw createError({ code: 1, message: message, httpStatusCode: 400 });
        }
        await wsDeleteNews(req.params.newsId);
        res.status(204).send();
    }
    catch (error) { next(error); }
})




module.exports = news;