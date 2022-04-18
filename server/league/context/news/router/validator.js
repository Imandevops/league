const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const validateCreateNews = async (body) => {
    const schema = Joi.object().keys({
        newsText: Joi.string().required().messages({
            'string.empty': `ورودی متن خبر اجباری است`,
            'any.required': `ورودی متن خبر اجباری است`}),
        newsTitle: Joi.string().required().messages({
            'string.base': `نوع ورودی عنوان خبر صحیح نمی‌باشد`,
            'string.empty': `ورودی عنوان خبر اجباری است`,
            'any.required': `ورودی عنوان خبر اجباری است`
        }),
        newsDate: Joi.number().required().messages({
            'number.base': `نوع ورودی تاریخ خبر صحیح نمی‌باشد`,
            'number.empty': `ورودی تاریخ خبر اجباری است`,
            'any.required': `ورودی تاریخ خبر اجباری است`
        }),
    })
    return schema.validate(body);
}

const validateUpdateNews = async (body, newsId) => {
    body.newsId = newsId;
    const schema = Joi.object().keys({
        newsId: Joi.string().min(24).max(24).required().messages({
            'string.base': `نوع آیدی خبر درست  نیست`,
            'string.max': `آیدی خبر صحیح نیست`,
            'string.min': `آیدی خبر صحیح نیست`,
            'any.required': `آیدی خبر اجباری است`
        }),
        newsTitle: Joi.string().messages({
            'string.base': `نوع ورودی عنوان خبر صحیح نمی‌باشد`,
            'string.empty': `ورودی عنوان خبر اجباری است`,
        }),
        newsText: Joi.string().messages({
            'string.base': `نوع ورودی متن خبر صحیح نمی‌باشد`,
            'string.empty': `ورودی متن خبر اجباری است`,
        }),
        newsDate: Joi.number().messages({
            'number.base': `نوع ورودی تاریخ خبر صحیح نمی‌باشد`,
            'number.empty': `ورودی تاریخ خبر اجباری است`,
        }),
    })
    return schema.validate(body);
}
const validateLoadNewsById = async (body) => {
    const schema = Joi.object().keys({
        newsId: Joi.string().min(24).max(24).required().messages({
            'string.base': `نوع آیدی خبر درست  نیست`,
            'string.max': `آیدی خبر صحیح نیست`,
            'string.min': `آیدی خبر صحیح نیست`,
            'any.required': `آیدی خبر اجباری است`
        }),
    })
    return schema.validate(body);
}

const validateDeleteNews = async (body) => {
    const schema = Joi.object().keys({
        newsId: Joi.string().min(24).max(24).required().messages({
            'string.base': `نوع آیدی خبر درست  نیست`,
            'string.max': `آیدی خبر صحیح نیست`,
            'string.min': `آیدی خبر صحیح نیست`,
            'any.required': `آیدی خبر اجباری است`
        }),
    })
    return schema.validate(body);
}


module.exports = { validateCreateNews, validateUpdateNews, validateLoadNewsById,validateDeleteNews }