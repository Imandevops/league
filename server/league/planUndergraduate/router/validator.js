const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)


const validateCreatePlanUndergraduate = async (body) => {
    
    const schema = Joi.object().keys({
       
        planUniqueName: Joi.string().invalid('0').required().messages({
            'string.base': `نوع شناسه طرح صحیح نمی‌باشد`,
            'string.empty': `شناسه طرح اجباری است`,
            'any.required': `شناسه طرح اجباری است`,
            'any.invalid': 'شناسه طرح اجباری است'
        }),
        planName: Joi.string().required().invalid('').messages({
            'string.base': `نوع نام طرح صحیح نمی‌باشد`,
            'string.empty': `نام طرح اجباری است`,
            'any.required': `نام طرح اجباری است`,
            'any.invalid': `نام طرح اجباری است`
        }),
      
        innovativeAspects: Joi.string().invalid('').allow('').messages({
            'string.base': `نوع برخورداری از جنبه های نو آورانه کارشناس صحیح نمی‌باشد`,
            'string.empty': `  برخورداری از جنبه های نو آورانه کارشناس  اجباری است`,
            'any.required': `  برخورداری از جنبه های نو آورانه کارشناس  اجباری است`,
            'any.invalid': '  برخورداری از جنبه های نو آورانه کارشناس  اجباری است'
        }),
        innovativeAspectsScore: Joi.number().invalid('0').required().messages({
            'number.base': `امتیاز نوع برخورداری از جنبه های نو آورانه کارشناس صحیح نمی‌باشد`,
            'number.empty': ` امتیاز برخورداری از جنبه های نو آورانه کارشناس  اجباری است`,
            'any.required': ` امتیاز برخورداری از جنبه های نو آورانه کارشناس  اجباری است`,
            'any.invalid': ' امتیاز برخورداری از جنبه های نو آورانه کارشناس  اجباری است'
        }),
        newTopic: Joi.string().invalid('').allow('').messages({
            'string.base': `  جدید بودن موضوع صحیح نمی‌باشد`,
            'string.empty': ` جدید بودن موضوع اجباری است`,
            'any.required': ` جدید بودن موضوع اجباری است`,
            'any.invalid': ' جدید بودن موضوع اجباری است'
        }),
        newTopicScore: Joi.number().invalid('0').required().messages({
            'number.base': ` امتیاز جدید بودن موضوع صحیح نمی‌باشد`,
            'number.empty': ` امتیاز جدید بودن موضوع اجباری است`,
            'any.required': `امتیاز جدید بودن موضوع اجباری است`,
            'any.invalid': 'امتیاز جدید بودن موضوع اجباری است'
        }),
        scientificValue: Joi.string().invalid('').allow('').messages({
            'string.base': ` ارزش علمی و کاربردی صحیح نمی‌باشد`,
            'string.empty': ` ارزش علمی و کاربردی اجباری است`,
            'any.required': ` ارزش علمی و کاربردی اجباری است`,
            'any.invalid': ' ارزش علمی و کاربردی اجباری است'
        }),
        scientificValueScore: Joi.number().invalid('0').required().messages({
            'number.base': `امتیاز ارزش علمی و کاربردی صحیح نمی‌باشد`,
            'number.empty': `امتیاز ارزش علمی و کاربردی اجباری است`,
            'any.required': ` امتیاز ارزش علمی و کاربردی اجباری است`,
            'any.invalid': 'امتیاز ارزش علمی و کاربردی اجباری است'
        }),
        explainable: Joi.string().invalid('').allow('').messages({
            'string.base': ` توجیه پذیری صحیح نمی‌باشد`,
            'string.empty': `  توجیه پذیری اجباری است`,
            'any.required': ` توجیه پذیری اجباری است`,
            'any.invalid': ' توجیه پذیری اجباری است'
        }),
        explainableScore: Joi.number().invalid('0').required().messages({
            'number.base': `امتیاز توجیه پذیری صحیح نمی‌باشد`,
            'number.empty': `امتیاز  توجیه پذیری اجباری است`,
            'any.required': `امتیاز توجیه پذیری اجباری است`,
            'any.invalid': 'امتیاز توجیه پذیری اجباری است'
        }),
        scalability: Joi.string().invalid('').allow('').messages({
            'string.base': ` توسعه پذیری و تبدیل به محصول کاربردی صحیح نمی‌باشد`,
            'string.empty': ` توسعه پذیری و تبدیل به محصول کاربردی اجباری است`,
            'any.required': `توسعه پذیری و تبدیل به محصول کاربردی اجباری است`,
            'any.invalid': ' توسعه پذیری و تبدیل به محصول کاربردی اجباری است'
        }),
        scalabilityScore: Joi.number().invalid('0').required().messages({
            'number.base': `امتیاز  توسعه پذیری و تبدیل به محصول کاربردی صحیح نمی‌باشد`,
            'number.empty': `امتیاز توسعه پذیری و تبدیل به محصول کاربردی اجباری است`,
            'any.required': `امتیاز توسعه پذیری و تبدیل به محصول کاربردی اجباری است`,
            'any.invalid': 'امتیاز توسعه پذیری و تبدیل به محصول کاربردی اجباری است'
        }),
        finalScore: Joi.number().invalid('0').required().messages({
            'number.base': `امتیاز نهایی صحیح نمی‌باشد`,
            'number.empty': `امتیاز  نهایی اجباری است`,
            'any.required': `امتیاز  نهایی اجباری است`,
            'any.invalid': 'امتیاز نهایی اجباری است'
        })
        ,
        finalOpinion: Joi.string().invalid('0').required().messages({
            'string.base': `نظر نهایی کارشناس صحیح نمی‌باشد`,
            'string.empty': `نظر  نهایی کارشناس اجباری است`,
            'any.required': `نظر  نهایی کارشناس اجباری است`,
            'any.invalid': 'نظر نهایی کارشناس اجباری است'
        })
        
    })
    return schema.validate(body);
};


const validateUpdatePlanUndergraduate = async (body, planUndergraduateId) => {
    body.planUndergraduateId = planUndergraduateId;
    const schema = Joi.object().keys({
        planUndergraduateId: Joi.string().required().messages({
            'string.base': `نوع آیدی طرح اشتباه است`,
            'any.required': `آیدی طرح اجباری است`
        }),
        planUniqueName: Joi.string().invalid('0').required().messages({
            'string.base': `نوع شناسه طرح صحیح نمی‌باشد`,
            'string.empty': `شناسه طرح اجباری است`,
            'any.required': `شناسه طرح اجباری است`,
            'any.invalid': 'شناسه طرح اجباری است'
        }),
        planName: Joi.string().required().invalid('').messages({
            'string.base': `نوع نام طرح صحیح نمی‌باشد`,
            'string.empty': `نام طرح اجباری است`,
            'any.required': `نام طرح اجباری است`,
            'any.invalid': `نام طرح اجباری است`
        }),
      
        innovativeAspects: Joi.string().invalid('').allow('').messages({
            'string.base': `نوع برخورداری از جنبه های نو آورانه کارشناس صحیح نمی‌باشد`,
            'string.empty': `  برخورداری از جنبه های نو آورانه کارشناس  اجباری است`,
            'any.required': `  برخورداری از جنبه های نو آورانه کارشناس  اجباری است`,
            'any.invalid': '  برخورداری از جنبه های نو آورانه کارشناس  اجباری است'
        }),
        innovativeAspectsScore: Joi.number().invalid('0').required().messages({
            'number.base': `امتیاز نوع برخورداری از جنبه های نو آورانه کارشناس صحیح نمی‌باشد`,
            'number.empty': ` امتیاز برخورداری از جنبه های نو آورانه کارشناس  اجباری است`,
            'any.required': ` امتیاز برخورداری از جنبه های نو آورانه کارشناس  اجباری است`,
            'any.invalid': ' امتیاز برخورداری از جنبه های نو آورانه کارشناس  اجباری است'
        }),
        newTopic: Joi.string().invalid('').allow('').messages({
            'string.base': `  جدید بودن موضوع صحیح نمی‌باشد`,
            'string.empty': ` جدید بودن موضوع اجباری است`,
            'any.required': ` جدید بودن موضوع اجباری است`,
            'any.invalid': ' جدید بودن موضوع اجباری است'
        }),
        newTopicScore: Joi.number().invalid('0').required().messages({
            'number.base': ` امتیاز جدید بودن موضوع صحیح نمی‌باشد`,
            'number.empty': ` امتیاز جدید بودن موضوع اجباری است`,
            'any.required': `امتیاز جدید بودن موضوع اجباری است`,
            'any.invalid': 'امتیاز جدید بودن موضوع اجباری است'
        }),
        scientificValue: Joi.string().invalid('').allow('').messages({
            'string.base': ` ارزش علمی و کاربردی صحیح نمی‌باشد`,
            'string.empty': ` ارزش علمی و کاربردی اجباری است`,
            'any.required': ` ارزش علمی و کاربردی اجباری است`,
            'any.invalid': ' ارزش علمی و کاربردی اجباری است'
        }),
        scientificValueScore: Joi.number().invalid('0').required().messages({
            'number.base': `امتیاز ارزش علمی و کاربردی صحیح نمی‌باشد`,
            'number.empty': `امتیاز ارزش علمی و کاربردی اجباری است`,
            'any.required': ` امتیاز ارزش علمی و کاربردی اجباری است`,
            'any.invalid': 'امتیاز ارزش علمی و کاربردی اجباری است'
        }),
        explainable: Joi.string().invalid('').allow('').messages({
            'string.base': ` توجیه پذیری صحیح نمی‌باشد`,
            'string.empty': `  توجیه پذیری اجباری است`,
            'any.required': ` توجیه پذیری اجباری است`,
            'any.invalid': ' توجیه پذیری اجباری است'
        }),
        explainableScore: Joi.number().invalid('0').required().messages({
            'number.base': `امتیاز توجیه پذیری صحیح نمی‌باشد`,
            'number.empty': `امتیاز  توجیه پذیری اجباری است`,
            'any.required': `امتیاز توجیه پذیری اجباری است`,
            'any.invalid': 'امتیاز توجیه پذیری اجباری است'
        }),
        scalability: Joi.string().invalid('').allow('').messages({
            'string.base': ` توسعه پذیری و تبدیل به محصول کاربردی صحیح نمی‌باشد`,
            'string.empty': ` توسعه پذیری و تبدیل به محصول کاربردی اجباری است`,
            'any.required': `توسعه پذیری و تبدیل به محصول کاربردی اجباری است`,
            'any.invalid': ' توسعه پذیری و تبدیل به محصول کاربردی اجباری است'
        }),
        scalabilityScore: Joi.number().invalid('0').required().messages({
            'number.base': `امتیاز  توسعه پذیری و تبدیل به محصول کاربردی صحیح نمی‌باشد`,
            'number.empty': `امتیاز توسعه پذیری و تبدیل به محصول کاربردی اجباری است`,
            'any.required': `امتیاز توسعه پذیری و تبدیل به محصول کاربردی اجباری است`,
            'any.invalid': 'امتیاز توسعه پذیری و تبدیل به محصول کاربردی اجباری است'
        }),
        finalScore: Joi.number().invalid('0').required().messages({
            'number.base': `امتیاز نهایی صحیح نمی‌باشد`,
            'number.empty': `امتیاز  نهایی اجباری است`,
            'any.required': `امتیاز  نهایی اجباری است`,
            'any.invalid': 'امتیاز نهایی اجباری است'
        })
        ,
        finalOpinion: Joi.string().invalid('0').required().messages({
            'string.base': `نظر نهایی کارشناس صحیح نمی‌باشد`,
            'string.empty': `نظر  نهایی کارشناس اجباری است`,
            'any.required': `نظر  نهایی کارشناس اجباری است`,
            'any.invalid': 'نظر نهایی کارشناس اجباری است'
        })
    })
    return schema.validate(body);
};


module.exports = {
    validateCreatePlanUndergraduate,validateUpdatePlanUndergraduate
}