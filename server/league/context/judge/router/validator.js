const Joi = require('joi');


const validateCreateJudge = async (body) => {
    const schema = Joi.object().keys({
        name: Joi.string().required().messages({
            'string.base': `نوع ورودی نام داور صحیح نمی‌باشد`,
            'string.empty': `ورودی نام داور اجباری است`,
            'any.required': `ورودی نام داور اجباری است`
        }),
        position: Joi.string().required().messages({
            'string.base': `نوع سمت داور صحیح نمی‌باشد`,
            'string.empty': `سمت داور اجباری است`,
            'any.required': `سمت داور اجباری است`
        }),
    })

    return schema.validate(body);
}


const validateUpdateJudge = async (body, judgeId) => {
    body.judgeId = judgeId;
    const schema = Joi.object().keys({
        name: Joi.string().messages({
            'string.base': `نوع ورودی نام داور صحیح نمی‌باشد`,
        }),
        position: Joi.string().messages({
            'string.base': `نوع سمت داور صحیح نمی‌باشد`,
        }),
        judgeId: Joi.string().required().messages({
            'string.base': `نوع آیدی داور اشتباه است`,
            'any.required': `آیدی داور اجباری است`
        })});
    return schema.validate(body);
};


const validateDeleteJudge = async (body) => {
    const schema = Joi.object().keys({
        judgeId: Joi.string().required().messages({
            'string.base': `نوع آیدی داور اشتباه است`,
            'any.required': `آیدی داور اجباری است`
        }),
    })
    return schema.validate(body);
};


const validateLoadJudge = async (judgeId) => {
    const body = {};
    body.judgeId = judgeId;
    const schema = Joi.object().keys({
        judgeId: Joi.string().required().messages({
            'string.base': `نوع آیدی داور اشتباه است`,
            'any.required': `آیدی داور اجباری است`
        })
    });
    return schema.validate(body);
}



module.exports = { validateCreateJudge, validateUpdateJudge, validateDeleteJudge, validateLoadJudge}