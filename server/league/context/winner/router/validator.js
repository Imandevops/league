const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)


const validateCreateWinner = async (body) => {
    const schema = Joi.object().keys({
        team: Joi.required().messages({
            'any.required': `ورودی نام اعضای تیم اجباری است`
        }),
        leagueRound: Joi.string().required().messages({
            'string.base': `نوع دوره لیگ صحیح نمی‌باشد`,
            'string.empty': `دوره لیگ اجباری است`,
            'any.required': `دوره لیگ اجباری است`
        }),
        abb: Joi.string().required().messages({
            'string.base': `نوع ورودی اختصار نام شرکت صحیح نمی‌باشد`,
            'string.empty': `ورودی اختصار نام شرکت اجباری است`,
            'any.required': `ورودی اختصار نام شرکت اجباری است`
        }),
        rank: Joi.string().required().messages({
            'string.base': `نوع ورودی رتبه بنده صحیح نمی‌باشد`,
            'string.empty': `ورودی رتبه بنده اجباری است`,
            'any.required': `ورودی رتبه بنده اجباری است`
        }),
        planEnvoy: Joi.string().required().messages({
            'string.base': `نوع ورودی نام صاحب طرح صحیح نمی‌باشد`,
            'string.empty': `ورودی نام صاحب طرح اجباری است`,
            'any.required': `ورودی نام صاحب طرح اجباری است`
        }),
    })

    return schema.validate(body);
}


const validateUpdateWinner = async (body, winnerId) => {
    body.winnerId = winnerId;
    const schema = Joi.object().keys({
        winnerId: Joi.string().required().messages({
            'string.base': `نوع آیدی برنده اشتباه است`,
            'any.required': `آیدی برنده اجباری است`
        }),
        team: Joi.array().items(Joi.string()).messages({
            'array.base': `نوع ورودی نام اعضای تیم صحیح نمی‌باشد`,
        }),
        leagueRound: Joi.string().messages({
            'string.base': `نوع دوره لیگ صحیح نمی‌باشد`,
        }),
        abb: Joi.string().messages({
            'string.base': `نوع ورودی اختصار نام شرکت صحیح نمی‌باشد`,
        }),
        rank: Joi.string().messages({
            'string.base': `نوع ورودی رتبه بنده صحیح نمی‌باشد`,
            'string.empty': `ورودی رتبه بنده اجباری است`,
            'any.required': `ورودی رتبه بنده اجباری است`
        }),
        planEnvoy: Joi.string().messages({
            'string.base': `نوع ورودی نام صاحب طرح صحیح نمی‌باشد`,
            'string.empty': `ورودی نام صاحب طرح اجباری است`,
            'any.required': `ورودی نام صاحب طرح اجباری است`
        })
    })
    return schema.validate(body);
};


const validateDeleteWinner = async (body) => {
    const schema = Joi.object().keys({
        winnerId: Joi.string().required().messages({
            'string.base': `نوع آیدی برنده اشتباه است`,
            'any.required': `آیدی برنده اجباری است`
        }),
    })
    return schema.validate(body);
};


module.exports = { validateCreateWinner, validateUpdateWinner, validateDeleteWinner}