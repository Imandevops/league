const Joi = require('joi');


const validateCreateAbout = async (body) => {
    const schema = Joi.object().keys({
        aboutText: Joi.string().required().messages({
            'string.base': `نوع ورودی درباره لیگ صحیح نمی‌باشد`,
            'string.empty': `ورودی درباره لیگ اجباری است`,
            'any.required': `ورودی درباره لیگ اجباری است`
        }),
    })
    return schema.validate(body);
}

const validateLoadAbout = async (body) => {
    const schema = Joi.object().keys({
        aboutId: Joi.string().min(24).max(24).messages({
            'string.base': `نوع آیدی درباره لیگ درست  نیست`,
            'string.max': `آیدی درباره لیگ صحیح نیست`,
            'string.min': `آیدی درباره لیگ صحیح نیست`,
            'any.required': `آیدی درباره لیگ اجباری است`
        }),
        round: Joi.string().messages({
            'string.base': `نوع ورودی دوره لیگ صحیح نمی‌باشد`,
            'string.empty': `ورودی دوره لیگ اجباری است`,
            'any.required': `ورودی دوره لیگ اجباری است`
        }),
    })
    return schema.validate(body);
}

const validateUpdateAbout = async (body) => {
    const schema = Joi.object().keys({
        aboutText: Joi.string().messages({
            'string.base': `نوع ورودی درباره لیگ صحیح نمی‌باشد`,
            'string.empty': `ورودی درباره لیگ اجباری است`,
        }),
        round: Joi.string().messages({
            'string.base': `نوع ورودی دوره لیگ صحیح نمی‌باشد`,
            'string.empty': `ورودی دوره لیگ اجباری است`,
        }),
    })
    return schema.validate(body);
}

const validateDeleteAbout = async (body) => {
    const schema = Joi.object().keys({
        aboutId: Joi.string().required().messages({
            'string.base': `نوع آیدی درباره اشتباه است`,
            'any.required': `آیدی درباره اجباری است`
        }),
    })
    return schema.validate(body);
};

module.exports = { validateCreateAbout, validateLoadAbout, validateUpdateAbout,validateDeleteAbout }