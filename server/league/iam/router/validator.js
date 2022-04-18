const Joi = require('joi');
const { english_digit } = require('../../../utility/fnChangeFarsiNumber');


const validateRegister = async (body) => {
    const schema = Joi.object().keys({
        name: Joi.string().required().min(1).max(32).messages({
            'string.base': `نوع ورودی نام صحیح نمی‌باشد`,
            'string.empty': `ورودی نام اجباری است`,
            'string.min': `تعداد کاراکترهای نام ورودی کمتر از حد مجاز است `,
            'string.max': `تعداد کارکترهای نام بیش از حد مجاز است`,
            'any.required': `ورودی نام اجباری است`
        }),
        family: Joi.string().required().min(1).max(32).messages({
            'string.base': `نوع ورودی نام‌خانوادگی صحیح نمی‌باشد`,
            'string.empty': `نام‌خانوادگی اجباری است`,
            'string.max': `تعداد کارکترهای نام‌خانوادگی بیش از حد مجاز است`,
            'string.min': `تعداد کاراکترهای نام‌خانوادگی ورودی کمتر از حد مجاز است `,
            'any.required': `نام‌خانوادگی اجباری است`
        }),
        sex: Joi.boolean().required().messages({
            'boolean.base': `نوع ورودی جنسیت صحیح نمی‌باشد`,
            'boolean.empty': `تعیین جنسیت اجباری است`,
            'any.required': `تعیین جنسیت اجباری است`
        }),
        age: Joi.number().integer().required().messages({
            'boolean.base': `نوع ورودی سن صحیح نیست `,
            'boolean.empty': `ورودی سن اجباری است `,
            'any.required': `ورودی سن اجباری است `
        }),
        graduation: Joi.string().required().messages({
            'string.base': `نوع ورودی آخرین مدرک تحصیلی صحیح نیست`,
            'string.empty': `ورودی آخرین مدرک تحصیلی اجباری است`,
            'any.required': `ورودی آخرین مدرک تحصیلی اجباری است`
        }),
        graduationField: Joi.string().required().messages({
            'string.base': `نوع ورودی رشته تحصیلی صحیح نیست`,
            'string.empty': `ورودی رشته تحصیلی اجباری است`,
            'any.required': `ورودی رشته تحصیلی اجباری است`
        }),
        nationalId: Joi.string()
            // .custom((value, helper) => {
            //     if (value) {
            //         value = english_digit(value)
            //         if (value.length < 8 || parseInt(value, 10) == 0) return helper.message("کد ملی نادرست است")
            //         value = ('0000' + value).substr(value.length + 4 - 10);
            //         if (parseInt(value.substr(3, 6), 10) == 0) return helper.message("کد ملی نادرست است")
            //         if (value.length == 10) {
            //             if (value == '1111111111' || value == '0000000000' || value == '2222222222' ||
            //                 value == '3333333333' || value == '4444444444' || value == '5555555555' ||
            //                 value == '6666666666' || value == '7777777777' || value == '8888888888' ||
            //                 value == '9999999999') {
            //                 return helper.message("کد ملی نادرست است");
            //             }
            //             let c = parseInt(value.charAt(9));
            //             let n = 0;
            //             for (let i = 0; i < 9; i++) {
            //                 n += parseInt(value.charAt(i)) * (10 - i)
            //             }
            //             r = n - parseInt(n / 11) * 11;
            //             if ((r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r)) {
            //                 return true;
            //             } else {
            //                 return helper.messages("کد ملی نادرست است");
            //             }
            //         } else return true;
            //     } else return true;
            // })
            .required().messages({
                'string.base': `کدملی صحیح نمی‌باشد`,
            }),
        personnelId: Joi.number().integer().required().messages({
            'number.base': `نوع ورودی شماره  پرسنلی صحیح نیست`,
            'number.empty': `شماره پرسنلی اجباری است`,
            'any.required': `شماره پرسنلی اجباری است`
        }),
        companyName: Joi.string().required().messages({
            'string.base': `نوع ورودی نام شرکت صحیح نیست`,
            'string.empty': `نام شرکت اجباری است`,
            'any.required': `نام شرکت اجباری است`
        }),
        organizationLevel: Joi.string().required().messages({
            'string.base': `نوع ورودی سمت سازمانی صحیح نیست`,
            'string.empty': `سمت سازمانی اجباری است`,
            'any.required': `سمت سازمانی صحیح نیست`
        }),
        mobile: Joi.string().max(20).required()
            .messages({
                'string.base': `نوع ورودی  شماره موبایل صحیح نیست`,
                'string.empty': `شماره موبال اجباری است`,
                'string.max': `شماره موبایل صحیح نیست`,
                'any.required': `شماره موبایل صحیح نیست`
            })
            .custom((value, helper) => {
                if (parseInt(value) > 09000000000 && parseInt(value) < 09999999999) return true;
                return helper.message("شماره موبایل نادرست است");
            }),
        email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ir', 'org'] } }),
        username: Joi.string().required().min(4).max(15).messages({
            'string.base': `نوع ورودی نام کاربری صحیح نیست`,
            'string.empty': `نام کاربری اجباری است`,
            'string.min': `نام کاربری حداقل چهار کاراکتر است`,
            'string.max': `تعداد کاراکترهای نام کاربری از حد مجاز است`,
            'any.required': `نام کاربری اجباری است`,
            'string.email': `ایمیل اشتباه است`
        }),
        password: Joi.string().required().min(6).max(50).messages({
            'string.base': `رمز عبور وارد شده صحیح نمی‌باشد`,
            'string.min': `رمز عبور باید بیشتر از 6 کاراکتر باشد`,
            'string.max': `تعداد کاراکترهای رمز عبور بیش از حد مجاز است`,
            'any.required': `رمز عبور اجباری است`
        }),
        type: Joi.string().required().messages({
            'string.base': `نوع کاربر وارد شده صحیح نمی‌باشد`,
        }),
    });
    return schema.validate(body);
};

const validateLogin = async (body) => {
    const schema = Joi.object().keys({
        username: Joi.string().required().min(3).messages({
            'string.base': `نوع نام کاربری صحیح نمی‌باشد`,
            'string.max': `تعداد کارکترهای نام کاربری کمتر از حد مجاز است`,
            'string.required': 'نام کاربری اجباری است',
            'string.empty': `نام کاربری نباید خالی باشد`,
        }),
        password: Joi.string().messages({
            'string.base': `نوع رمزعبور صحیح نمی‌باشد`,
            'string.empty': `رمزعبور نباید خالی باشد`,
        }),
        refreshToken: Joi.string().messages({
            'string.base': `نوع رفرش توکن صحیح نمی‌باشد`,
            'string.empty': `رفرش توکن نباید خالی باشد`,
        })
    }).or("password", "refreshToken")

    return schema.validate(body);
}

const validateLoadUser = async (query) => {
    const schema = Joi.object().keys({
        name: Joi.string().messages({
            'string.base': `نوع ورودی نام صحیح نمی‌باشد`
        }),
        family: Joi.string().messages({
            'string.base': `نوع ورودی نام‌خانوادگی صحیح نمی‌باشد`
        }),
        sex: Joi.string().messages({
            'string.base': `نوع ورودی جنسیت صحیح نمی‌باشد`
        }),
        graduation: Joi.string().messages({
            'string.base': `نوع ورودی آخرین مدرک تحصیلی صحیح نیست`
        }),
        nationalId: Joi.string().messages({
            'string.base': `کدملی صحیح نمی‌باشد`,
        }),
        personnelId: Joi.number().integer().messages({
            'number.base': `نوع ورودی شماره  پرسنلی صحیح نیست`
        }),
        companyName: Joi.string().messages({
            'string.base': `نوع ورودی نام شرکت صحیح نیست`
        }),
        email: Joi.string().messages({
            'string.base': `نوع ورودی ایمیل صحیح نیست`
        }),
        username: Joi.string().messages({
            'string.base': `نوع ورودی نام کاربری صحیح نیست`
        })
    });
    return schema.validate(query);
}

const validateLoadUserById = async (params) => {
    const schema = Joi.object().keys({
        userId: Joi.string().required().min(24).max(24).message({
            'string.base': `نوع ورودی شناسه کاربری صحیح نمی‌باشد`,
            'string.min': `تعداد کاراکترهای شناسه کاربری صحیح نیست`,
            'string.max': `تعداد کاراکترهای شناسه کاربری صحیح نیست`,
            'any.required': `شناسه کاربری اجباری است`
        })
    });
    return schema.validate(params);
}


const validateUpdateUser = async (body, userId) => {
    body.userId = userId
    const schema = Joi.object().keys({
        userId: Joi.string().required().min(24).max(24).message({
            'string.base': `نوع ورودی شناسه کاربری صحیح نمی‌باشد`,
            'string.min': `تعداد کاراکترهای شناسه کاربری صحیح نیست`,
            'string.max': `تعداد کاراکترهای شناسه کاربری صحیح نیست`,
        }),
        name: Joi.string().min(1).max(32).messages({
            'string.base': `نوع ورودی نام صحیح نمی‌باشد`,
            'string.min': `تعداد کاراکترهای نام ورودی کمتر از حد مجاز است `,
            'string.max': `تعداد کارکترهای نام بیش از حد مجاز است`,
        }),
        family: Joi.string().min(1).max(32).messages({
            'string.base': `نوع ورودی نام‌خانوادگی صحیح نمی‌باشد`,
            'string.max': `تعداد کارکترهای نام‌خانوادگی بیش از حد مجاز است`,
            'string.min': `تعداد کاراکترهای نام‌خانوادگی ورودی کمتر از حد مجاز است `,
        }),
        sex: Joi.boolean().messages({
            'boolean.base': `نوع ورودی جنسیت صحیح نمی‌باشد`,
        }),
        age: Joi.number().integer().messages({
            'boolean.base': `نوع ورودی سن صحیح نیست `,
        }),
        graduation: Joi.string().messages({
            'string.base': `نوع ورودی آخرین مدرک تحصیلی صحیح نیست`,
        }),
        graduationField: Joi.string().messages({
            'string.base': `نوع ورودی رشته تحصیلی صحیح نیست`,
        }),
        nationalId: Joi.string()
            // .custom((value, helper) => {
            //     if (value) {
            //         value = english_digit(value)
            //         if (value.length < 8 || parseInt(value, 10) == 0) return helper.message("کد ملی نادرست است")
            //         value = ('0000' + value).substr(value.length + 4 - 10);
            //         if (parseInt(value.substr(3, 6), 10) == 0) return helper.message("کد ملی نادرست است")
            //         if (value.length == 10) {
            //             if (value == '1111111111' || value == '0000000000' || value == '2222222222' ||
            //                 value == '3333333333' || value == '4444444444' || value == '5555555555' ||
            //                 value == '6666666666' || value == '7777777777' || value == '8888888888' ||
            //                 value == '9999999999') {
            //                 return helper.message("کد ملی نادرست است");
            //             }
            //             let c = parseInt(value.charAt(9));
            //             let n = 0;
            //             for (let i = 0; i < 9; i++) {
            //                 n += parseInt(value.charAt(i)) * (10 - i)
            //             }
            //             r = n - parseInt(n / 11) * 11;
            //             if ((r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r)) {
            //                 return true;
            //             } else {
            //                 return helper.messages("کد ملی نادرست است");
            //             }
            //         } else return true;
            //     } else return true;
            // })
            .messages({
                'string.base': `کدملی صحیح نمی‌باشد`,
            }),
        personnelId: Joi.number().integer().messages({
            'number.base': `نوع ورودی شماره  پرسنلی صحیح نیست`,
        }),
        companyName: Joi.string().messages({
            'string.base': `نوع ورودی نام شرکت صحیح نیست`,
        }),
        organizationLevel: Joi.string().messages({
            'string.base': `نوع ورودی سمت سازمانی صحیح نیست`,
        }),
        mobile: Joi.string().max(20)
            .messages({
                'string.base': `نوع ورودی  شماره موبایل صحیح نیست`,
                'string.max': `شماره موبایل صحیح نیست`,
            })
            .custom((value, helper) => {
                if (parseInt(value) > 09000000000 && parseInt(value) < 09999999999) return true;
                return helper.message("شماره موبایل نادرست است");
            }),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ir', 'org'] } }),
        username: Joi.string().min(4).max(15).messages({
            'string.base': `نوع ورودی نام کاربری صحیح نیست`,
            'string.min': `نام کاربری حداقل چهار کاراکتر است`,
            'string.max': `تعداد کاراکترهای نام کاربری از حد مجاز است`,
            'string.email': `ایمیل اشتباه است`
        }),
        password: Joi.string().min(6).max(15).messages({
            'string.base': `رمز عبور وارد شده صحیح نمی‌باشد`,
            'string.min': `رمز عبور باید بیشتر از 6 کاراکتر باشد`,
            'string.max': `تعداد کاراکترهای رمز عبور بیش از حد مجاز است`,
        }),
        type: Joi.string().messages({
            'string.base': `نوع کاربر وارد شده صحیح نمی‌باشد`,
        }),
    });
    return schema.validate(body);
}

const validateResetPass = async (username) => {
    const body = {};
    body.username = username;
    const schema = Joi.object().keys({
        username: Joi.string().required().messages({
            'string.base': `نوع نام کاربری اشتباه است`,
            'any.required': `نام کاربر اجباری است`
        }),
    })
    return schema.validate(body);
}


module.exports = {
    validateRegister,
    validateLogin,
    validateLoadUser,
    validateLoadUserById,
    validateUpdateUser,
    validateResetPass
}