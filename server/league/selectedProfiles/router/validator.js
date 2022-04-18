const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)



const validateCreateSelectedProfile = async (body) => {
    
    const { designsProvidedList } = body;
    if (designsProvidedList.length == 0) {
        body._designsProvidedList = [{}];
    }
    else {
        body._designsProvidedList = designsProvidedList;
    }
    
    
    let designProvided = Joi.object().keys({
        name: Joi.string().required().min(2).max(500).messages({
            'string.base': `نوع ورودی نام طرح صحیح نمی‌باشد`,
            'string.empty': `ورودی نام طرح اجباری است`,
            'string.min': `تعداد کاراکترهای نام طرح ورودی کمتر از حد مجاز است `,
            'string.max': `تعداد کارکترهای نام طرح بیش از حد مجاز است`,
            'any.required': `ورودی نام طرح اجباری است`
        }),
        level: Joi.string().required().messages({
            'string.base': `نوع ورودی  سطح طرح صحیح نیست`,
            'string.empty': `سطح طرح اجباری است`,
            'any.required': `سطح طرح اجباری است`
        }),
        nature: Joi.string().required().messages({
            'string.base': `نوع ورودی  ماهیت طرح صحیح نیست`,
            'string.empty': `ماهیت طرح اجباری است`,
            'any.required': `ماهیت طرح اجباری است`
        }),
        courseTitle: Joi.string().required().messages({
            'string.base': `نوع ورودی  عنوان دوره صحیح نیست`,
            'string.empty': `عنوان دوره اجباری است`,
            'any.required': `عنوان دوره اجباری است`
        }),
        stagePosition: Joi.string().required().messages({
            'string.base': `نوع ورودی  مقام مرحله ای صحیح نیست`,
            'string.empty': `مقام مرحله ای اجباری است`,
            'any.required': `مقام مرحله ای اجباری است`
        }),
        generalPosition: Joi.string().required().messages({
            'string.base': `نوع ورودی  مقام کلی صحیح نیست`,
            'string.empty': `مقام کلی اجباری است`,
            'any.required': `مقام کلی اجباری است`
        }),
        innovatorsClubScore: Joi.string().required().messages({
            'string.base': `نوع ورودی  امتیاز باشگاه نوآوران صحیح نیست`,
            'string.empty': `امتیاز باشگاه نوآوران اجباری است`,
            'any.required': `امتیاز باشگاه نوآوران اجباری است`
        })
    });
    
    const schema = Joi.object().keys({
        name: Joi.string().messages({
            'string.base': `نوع ورودی نام صحیح نمی‌باشد`,
            'string.empty': `نام برگزیده اجباری است`,
            'any.required': `نام برگزیده اجباری است`,
            'any.invalid': `نام برگزیده اجباری است`
        }),
        family: Joi.string().messages({
            'string.base': `نوع ورودی نام‌خانوادگی صحیح نمی‌باشد`,
            'string.empty': `نام‌خانوادگی برگزیده اجباری است`,
            'any.required': `نام‌خانوادگی برگزیده اجباری است`,
            'any.invalid': `نام‌خانوادگی برگزیده اجباری است`
        }),
        lastEducationalCertificate: Joi.string().invalid('').required().messages({
            'string.base': `آخرین مدرک تحصیلی  صحیح نمی‌باشد`,
            'string.empty': `آخرین مدرک تحصیلی اجباری است`,
            'any.required': `آخرین مدرک تحصیلی اجباری است`,
            'any.invalid': `آخرین مدرک تحصیلی اجباری است`
        }),
        companyName: Joi.string().invalid('').required().messages({
            'string.base': `نام شرکت  صحیح نمی‌باشد`,
            'string.empty': `نام شرکت اجباری است`,
            'any.required': `نام شرکت اجباری است`         
        }),
        designsProvidedList: Joi.allow(),
        _designsProvidedList: Joi.array().required().items(designProvided).messages({
            'any.required': `ورودی  طرح اجباری است`,
            'array.empty': `ورودی  طرح اجباری است`
        }),
        organizationLevel: Joi.string().required().invalid('').messages({
            'string.base': `نوع سمت سازمانی شرکت صحیح نمی‌باشد`,
            'string.empty': `سمت سازمانی شرکت اجباری است`,
            'any.required': `سمت سازمانی شرکت اجباری است`,
            'any.invalid': `سمت سازمانی شرکت اجباری است`
        }),
        startDate: Joi.date().required().invalid('').messages({
            'string.base': `نوع تاریخ شروع به کار صحیح نمی‌باشد`,
            'string.empty': `تاریخ شروع به کار اجباری است`,
            'any.required': `تاریخ شروع به کار اجباری است`,
            'any.invalid': `تاریخ شروع به کار اجباری است`
        }),
        summeryExecutiveRecords: Joi.string().invalid('0').required().messages({
            'string.base': `نوع خلاصه سوابق اجرایی صحیح نمی‌باشد`,
            'string.empty': `خلاصه سوابق اجرایی اجباری است`,
            'any.required': `خلاصه سوابق اجرایی اجباری است`,
            'any.invalid': 'خلاصه سوابق اجرایی اجباری است'
        })
       
    })
   
    return schema.validate(body);
    
    
};

const validateUpdateSelectedProfile = async (body, Id) => {
    
    //body.Id = Id;
    const { designsProvidedList } = body;
    if (designsProvidedList.length == 0) {
        body._designsProvidedList = [{}];
    }
    else {
        body._designsProvidedList = designsProvidedList;
    }
    
    
    let designProvided = Joi.object().keys({
       
        name: Joi.string().required().min(2).max(500).messages({
            'string.base': `نوع ورودی نام طرح صحیح نمی‌باشد`,
            'string.empty': `ورودی نام طرح اجباری است`,
            'string.min': `تعداد کاراکترهای نام طرح ورودی کمتر از حد مجاز است `,
            'string.max': `تعداد کارکترهای نام طرح بیش از حد مجاز است`,
            'any.required': `ورودی نام طرح اجباری است`
        }),
        level: Joi.string().required().messages({
            'string.base': `نوع ورودی  سطح طرح صحیح نیست`,
            'string.empty': `سطح طرح اجباری است`,
            'any.required': `سطح طرح اجباری است`
        }),
        nature: Joi.string().required().messages({
            'string.base': `نوع ورودی  ماهیت طرح صحیح نیست`,
            'string.empty': `ماهیت طرح اجباری است`,
            'any.required': `ماهیت طرح اجباری است`
        }),
        courseTitle: Joi.string().required().messages({
            'string.base': `نوع ورودی  عنوان دوره صحیح نیست`,
            'string.empty': `عنوان دوره اجباری است`,
            'any.required': `عنوان دوره اجباری است`
        }),
        stagePosition: Joi.string().required().messages({
            'string.base': `نوع ورودی  مقام مرحله ای صحیح نیست`,
            'string.empty': `مقام مرحله ای اجباری است`,
            'any.required': `مقام مرحله ای اجباری است`
        }),
        generalPosition: Joi.string().required().messages({
            'string.base': `نوع ورودی  مقام کلی صحیح نیست`,
            'string.empty': `مقام کلی اجباری است`,
            'any.required': `مقام کلی اجباری است`
        }),
        innovatorsClubScore: Joi.string().required().messages({
            'string.base': `نوع ورودی  امتیاز باشگاه نوآوران صحیح نیست`,
            'string.empty': `امتیاز باشگاه نوآوران اجباری است`,
            'any.required': `امتیاز باشگاه نوآوران اجباری است`
        })
    });
    
    const schema = Joi.object().keys({
        name: Joi.string().messages({
            'string.base': `نوع ورودی نام صحیح نمی‌باشد`,
            'string.empty': `نام برگزیده اجباری است`,
            'any.required': `نام برگزیده اجباری است`,
            'any.invalid': `نام برگزیده اجباری است`
        }),
        family: Joi.string().messages({
            'string.base': `نوع ورودی نام‌خانوادگی صحیح نمی‌باشد`,
            'string.empty': `نام‌خانوادگی برگزیده اجباری است`,
            'any.required': `نام‌خانوادگی برگزیده اجباری است`,
            'any.invalid': `نام‌خانوادگی برگزیده اجباری است`
        }),
        lastEducationalCertificate: Joi.string().invalid('').required().messages({
            'string.base': `آخرین مدرک تحصیلی  صحیح نمی‌باشد`,
            'string.empty': `آخرین مدرک تحصیلی اجباری است`,
            'any.required': `آخرین مدرک تحصیلی اجباری است`,
            'any.invalid': `آخرین مدرک تحصیلی اجباری است`
        }),
        companyName: Joi.string().invalid('').required().messages({
            'string.base': `نام شرکت  صحیح نمی‌باشد`,
            'string.empty': `نام شرکت اجباری است`,
            'any.required': `نام شرکت اجباری است`         
        }),
        designsProvidedList: Joi.allow(),
        _designsProvidedList: Joi.array().required().items(designProvided).messages({
            'any.required': `ورودی  طرح اجباری است`,
            'array.empty': `ورودی  طرح اجباری است`
        }),
        organizationLevel: Joi.string().required().invalid('').messages({
            'string.base': `نوع سمت سازمانی شرکت صحیح نمی‌باشد`,
            'string.empty': `سمت سازمانی شرکت اجباری است`,
            'any.required': `سمت سازمانی شرکت اجباری است`,
            'any.invalid': `سمت سازمانی شرکت اجباری است`
        }),
        startDate: Joi.date().required().invalid('').messages({
            'string.base': `نوع تاریخ شروع به کار صحیح نمی‌باشد`,
            'string.empty': `تاریخ شروع به کار اجباری است`,
            'any.required': `تاریخ شروع به کار اجباری است`,
            'any.invalid': `تاریخ شروع به کار اجباری است`
        }),
        summeryExecutiveRecords: Joi.string().invalid('0').required().messages({
            'string.base': `نوع خلاصه سوابق اجرایی صحیح نمی‌باشد`,
            'string.empty': `خلاصه سوابق اجرایی اجباری است`,
            'any.required': `خلاصه سوابق اجرایی اجباری است`,
            'any.invalid': 'خلاصه سوابق اجرایی اجباری است'
        })
       
    })
   
    return schema.validate(body);
    
    
};


const validateDeleteSelectedProfile = async (body) => {
    const schema = Joi.object().keys({
        Id: Joi.string().required().messages({
            'string.base': `نوع آیدی پروفایل برگزیده اشتباه است`,
            'any.required': `آیدی پروفایل برگزیده اجباری است`
        }),
    })
    return schema.validate(body);
};

module.exports = {
    validateCreateSelectedProfile,validateDeleteSelectedProfile,validateUpdateSelectedProfile
}