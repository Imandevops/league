const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)


const validateCreatePlanExpertInfo = async (body) => {
    
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
      
        nameAndFamily: Joi.string().invalid('0').required().messages({
            'string.base': `نوع نام ونام خانوادگی کارشناس صحیح نمی‌باشد`,
            'string.empty': `نام ونام خانوادگی کارشناس  اجباری است`,
            'any.required': `نام ونام خانوادگی کارشناس  اجباری است`,
            'any.invalid': 'نام ونام خانوادگی کارشناس  اجباری است'
        }),
        specializedLevel: Joi.string().invalid('0').required().messages({
            'string.base': `نوع سمت شغلی صحیح نمی‌باشد`,
            'string.empty': `سمت شغلی اجباری است`,
            'any.required': `سمت شغلی اجباری است`,
            'any.invalid': 'سمت شغلی اجباری است'
        }),
        serviceLocation: Joi.string().invalid('0').required().messages({
            'string.base': `نوع محل خدمت صحیح نمی‌باشد`,
            'string.empty': `محل خدمت اجباری است`,
            'any.required': `محل خدمت اجباری است`,
            'any.invalid': 'محل خدمت اجباری است'
        })
        
    })
    return schema.validate(body);
};


const validateUpdatePlanExpertInfo = async (body, planExpertInfoId) => {
    body.planExpertInfoId = planExpertInfoId;
    const schema = Joi.object().keys({
        planExpertInfoId: Joi.string().required().messages({
            'string.base': `نوع طرح اشتباه است`,
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
      
        nameAndFamily: Joi.string().invalid('0').required().messages({
            'string.base': `نوع نام ونام خانوادگی کارشناس صحیح نمی‌باشد`,
            'string.empty': `نام ونام خانوادگی کارشناس  اجباری است`,
            'any.required': `نام ونام خانوادگی کارشناس  اجباری است`,
            'any.invalid': 'نام ونام خانوادگی کارشناس  اجباری است'
        }),
        specializedLevel: Joi.string().invalid('0').required().messages({
            'string.base': `نوع سمت شغلی صحیح نمی‌باشد`,
            'string.empty': `سمت شغلی اجباری است`,
            'any.required': `سمت شغلی اجباری است`,
            'any.invalid': 'سمت شغلی اجباری است'
        }),
        serviceLocation: Joi.string().invalid('0').required().messages({
            'string.base': `نوع محل خدمت صحیح نمی‌باشد`,
            'string.empty': `محل خدمت اجباری است`,
            'any.required': `محل خدمت اجباری است`,
            'any.invalid': 'محل خدمت اجباری است'
        })
    })
    return schema.validate(body);
};


module.exports = {
    validateCreatePlanExpertInfo,validateUpdatePlanExpertInfo
}