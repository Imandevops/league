const Joi = require('joi');


const validateCreateInfo = async (body) => {
    const schema = Joi.object().keys({
        context: Joi.string().required().messages({
            'string.base': `نوع ورودی متن اینفوگرافیک صحیح نمی‌باشد`,
            'string.empty': `ورودی متن اینفوگرافیک اجباری است`,
            'any.required': `ورودی متن اینفوگرافیک اجباری است`
        }),
    })

    return schema.validate(body);
}


const validateUpdateInfo = async (body, infoId) => {
    body.infoId = infoId;
    const schema = Joi.object().keys({
        context: Joi.string().messages({
            'string.base': `نوع ورودی متن اینفوگرافیک صحیح نمی‌باشد`,
            'string.empty': `ورودی متن اینفوگرافیک اجباری است`,
            'any.required': `ورودی متن اینفوگرافیک اجباری است`
        }),
        infoId: Joi.string().required().messages({
            'string.base': `نوع آیدی اینفوگرافی اشتباه است`,
            'any.required': `آیدی اینفوگرافی اجباری است`
        })});
    return schema.validate(body);
};


const validateDeleteInfo = async (body) => {
    const schema = Joi.object().keys({
        infoId: Joi.string().required().messages({
            'string.base': `نوع آیدی داور اشتباه است`,
            'any.required': `آیدی داور اجباری است`
        }),
    })
    return schema.validate(body);
};


module.exports = { validateCreateInfo, validateUpdateInfo, validateDeleteInfo}