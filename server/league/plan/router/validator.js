const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)


const validateCreatePlan = async (body) => {
    const { authors } = body;
    if (authors.length == 0) {
        body._authors = [{}];
    }
    else {
        body._authors = authors;
    }
    let author = Joi.object().keys({
        name: Joi.string().required().min(2).max(500).messages({
            'string.base': `نوع ورودی نام نویسنده طرح صحیح نمی‌باشد`,
            'string.empty': `ورودی نام نویسنده طرح اجباری است`,
            'string.min': `تعداد کاراکترهای نام نویسنده طرح ورودی کمتر از حد مجاز است `,
            'string.max': `تعداد کارکترهای نام نویسنده طرح بیش از حد مجاز است`,
            'any.required': `ورودی نام نویسنده طرح اجباری است`
        }),
        lastCertificate: Joi.string().required().min(2).max(500).messages({
            'string.base': `نوع ورودی آخرین مدرک تحصیلی  صحیح نمی‌باشد`,
            'string.empty': `ورودی آخرین مدرک تحصیلی اجباری است`,
            'string.min': `تعداد کاراکترهای آخرین مدرک تحصیلی ورودی کمتر از حد مجاز است `,
            'string.max': `تعداد کارکترهای آخرین مدرک تحصیلی بیش از حد مجاز است`,           
            'any.required': `ورودی آخرین مدرک تحصیلی اجباری است`
        }),
        cooperationType: Joi.string().required().min(2).max(500).messages({
            'string.base': `نوع ورودی نوع همکاری با سازمان  صحیح نمی‌باشد`,
            'string.empty': `ورودی نوع همکاری با سازمان اجباری است`,  
            'string.min': `تعداد کاراکترهای نوع همکاری با سازمان ورودی کمتر از حد مجاز است `,
            'string.max': `تعداد کارکترهای نوع همکاری با سازمان بیش از حد مجاز است`,             
            'any.required': `ورودی نوع همکاری با سازمان اجباری است`
        }),
        attendanceHistory: Joi.string().required().min(2).max(500).messages({
            'string.base': `نوع ورودی سابقه حضور در سازمان  صحیح نمی‌باشد`,
            'string.empty': `ورودی سابقه حضور در سازمان اجباری است`,
            'string.min': `تعداد کاراکترهای سابقه حضور در سازمان ورودی کمتر از حد مجاز است `,
            'string.max': `تعداد کارکترهای سابقه حضور در سازمان بیش از حد مجاز است`,           
            'any.required': `ورودی سابقه حضور در سازمان اجباری است`
        }),
        servicePlaceUnit: Joi.string().required().min(2).max(500).messages({
            'string.base': `نوع ورودی واحد محل خدمت  صحیح نمی‌باشد`,
            'string.empty': `ورودی واحد محل خدمت اجباری است`,
            'string.min': `تعداد کاراکترهای واحد محل خدمت ورودی کمتر از حد مجاز است `,
            'string.max': `تعداد کارکترهای واحد محل خدمت بیش از حد مجاز است`,           
            'any.required': `ورودی واحد محل خدمت اجباری است`
        }),
        specializedLevel: Joi.string().required().min(2).max(500).messages({
            'string.base': `نوع ورودی سمت(حوزه تخصصی)  صحیح نمی‌باشد`,
            'string.empty': `ورودی سمت(حوزه تخصصی)اجباری است`,
            'string.min': `تعداد کاراکترهای سمت(حوزه تخصصی) ورودی کمتر از حد مجاز است `,
            'string.max': `تعداد کارکترهای سمت(حوزه تخصصی) بیش از حد مجاز است`,           
            'any.required': `ورودی سمت(حوزه تخصصی) اجباری است`
        }),
        phone: Joi.string().required().messages({
            'string.base': `نوع ورودی  شماره موبایل صحیح نیست`,
            'string.empty': `شماره موبال اجباری است`,
            'any.required': `شماره موبال اجباری است`
        }).custom((value, helper) => {
            if (parseInt(value) > 09000000000 && parseInt(value) < 09999999999) return true;
            return helper.message("شماره موبایل نویسنده طرح نادرست است");
        }),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ir', 'org'] } }).required()
            .messages({
                'string.base': `نوع ورودی ایمیل نویسنده طرح اشتباه است`,
                'string.empty': `ایمیل نویسنده طرح اجباری است`,
                'any.required': `ایمیل نویسنده طرح اجباری است`,
                'string.email': `ایمیل نویسنده طرح اشتباه است`
            })
    });

    const schema = Joi.object().keys({
        abb: Joi.string().required().min(2).messages({
            'string.base': `نوع نام شرکت صحیح نمی‌باشد`,
            'string.empty': ` نام شرکت اجباری است`,
            'any.required': ` نام شرکت اجباری است`,
            'string.min': ` نام شرکت اجباری است `
        }),
        specializedField: Joi.string().invalid('').required().messages({
            'string.base': `نوع حوزه تخصص شرکت صحیح نمی‌باشد`,
            'string.empty': `حوزه تخصص شرکت اجباری است`,
            'any.required': `حوزه تخصص شرکت اجباری است`,
            'any.invalid': `حوزه تخصص شرکت اجباری است`
        }),
        authors: Joi.allow(),
        _authors: Joi.array().required().items(author).messages({
            'any.required': `ورودی نویسندگان طرح اجباری است`,
            'array.empty': `ورودی نویسندگان طرح اجباری است`
        }),
        companyEnvoy: Joi.string().required().invalid('').messages({
            'string.base': `نوع نام نماینده شرکت صحیح نمی‌باشد`,
            'string.empty': `نام نماینده شرکت اجباری است`,
            'any.required': `نام نماینده شرکت اجباری است`,
            'any.invalid': `نام نماینده شرکت اجباری است`
        }),
        planName: Joi.string().required().invalid('').messages({
            'string.base': `نوع نام طرح صحیح نمی‌باشد`,
            'string.empty': `نام طرح اجباری است`,
            'any.required': `نام طرح اجباری است`,
            'any.invalid': `نام طرح اجباری است`
        }),
        field: Joi.string().invalid('0').required().messages({
            'string.base': `نوع حوزه طرح صحیح نمی‌باشد`,
            'string.empty': `حوزه طرح اجباری است`,
            'any.required': `حوزه طرح اجباری است`,
            'any.invalid': 'حوزه طرح اجباری است'
        }),
        level: Joi.string().invalid('0').required().messages({
            'string.base': `نوع سطح طرح صحیح نمی‌باشد`,
            'string.empty': `سطح طرح اجباری است`,
            'any.required': `سطح طرح اجباری است`,
            'any.invalid': 'سطح طرح اجباری است'
        }),
        leagueCourse: Joi.string().invalid('0').required().messages({
            'string.base': `نوع دوره لیگ صحیح نمی‌باشد`,
            'string.empty': `دوره لیگ اجباری است`,
            'any.required': `دوره لیگ اجباری است`,
            'any.invalid': 'دوره لیگ اجباری است'
        }),
        leagueStage: Joi.string().invalid('0').required().messages({
            'string.base': `نوع مرحله لیگ صحیح نمی‌باشد`,
            'string.empty': `مرحله لیگ اجباری است`,
            'any.required': `مرحله لیگ اجباری است`,
            'any.invalid': 'مرحله لیگ اجباری است'
        }),
        planNature: Joi.string().invalid('0').required().messages({
            'string.base': `نوع ماهیت طرح صحیح نمی‌باشد`,
            'string.empty': `ماهیت طرح اجباری است`,
            'any.required': `ماهیت طرح اجباری است`,
            'any.invalid': 'ماهیت طرح اجباری است'
        }),
        innovation: Joi.string().required().invalid('').messages({
            'string.base': `نوع نوآوری طرح صحیح نمی‌باشد`,
            'string.empty': `نوآوری طرح اجباری است`,
            'any.required': `نوآوری طرح اجباری است`,
            'any.invalid': `نوآوری طرح اجباری است`
        }),
        target: Joi.string().required().invalid('').messages({
            'string.base': `نوع ورودی صحیح نمی‌باشد`,
            'string.empty': `هدف طرح اجباری است`,
            'any.required': `هدف طرح اجباری است`,
            'any.invalid': `هدف طرح اجباری است`
        }),
        description: Joi.string().required().invalid('').max(1000).messages({
            'string.base': `نوع خلاصه طرح صحیح نمی‌باشد`,
            'string.empty': `خلاصه طرح اجباری است`,
            'any.required': `خلاصه طرح اجباری است`,
            'string.max': `خلاصه باید کوتاه و مختصر و مفید باشد`,
            'any.invalid': `خلاصه طرح اجباری است`
        }),
        companyName: Joi.string().allow(),
        status: Joi.string().allow()
    })
    return schema.validate(body);
};
const validateUpdatePlan = async (body, planId) => {
    let author = Joi.object().keys({
        name: Joi.string().required().min(1).max(32).messages({
            'string.base': `نوع ورودی نام صحیح نمی‌باشد`,
            'string.empty': `ورودی نام اجباری است`,
            'string.min': `تعداد کاراکترهای نام ورودی کمتر از حد مجاز است `,
            'string.max': `تعداد کارکترهای نام بیش از حد مجاز است`,
            'any.required': `ورودی نام اجباری است`
        }),
        lastCertificate: Joi.string().required().min(2).max(500).messages({
            'string.base': `نوع ورودی آخرین مدرک تحصیلی  صحیح نمی‌باشد`,
            'string.empty': `ورودی آخرین مدرک تحصیلی اجباری است`,
            'string.min': `تعداد کاراکترهای آخرین مدرک تحصیلی ورودی کمتر از حد مجاز است `,
            'string.max': `تعداد کارکترهای آخرین مدرک تحصیلی بیش از حد مجاز است`,           
            'any.required': `ورودی آخرین مدرک تحصیلی اجباری است`
        }),
        cooperationType: Joi.string().required().min(2).max(500).messages({
            'string.base': `نوع ورودی نوع همکاری با سازمان  صحیح نمی‌باشد`,
            'string.empty': `ورودی نوع همکاری با سازمان اجباری است`,  
            'string.min': `تعداد کاراکترهای نوع همکاری با سازمان ورودی کمتر از حد مجاز است `,
            'string.max': `تعداد کارکترهای نوع همکاری با سازمان بیش از حد مجاز است`,             
            'any.required': `ورودی نوع همکاری با سازمان اجباری است`
        }),
        attendanceHistory: Joi.string().required().min(2).max(500).messages({
            'string.base': `نوع ورودی سابقه حضور در سازمان  صحیح نمی‌باشد`,
            'string.empty': `ورودی سابقه حضور در سازمان اجباری است`,
            'string.min': `تعداد کاراکترهای سابقه حضور در سازمان ورودی کمتر از حد مجاز است `,
            'string.max': `تعداد کارکترهای سابقه حضور در سازمان بیش از حد مجاز است`,           
            'any.required': `ورودی سابقه حضور در سازمان اجباری است`
        }),
        servicePlaceUnit: Joi.string().required().min(2).max(500).messages({
            'string.base': `نوع ورودی واحد محل خدمت  صحیح نمی‌باشد`,
            'string.empty': `ورودی واحد محل خدمت اجباری است`,
            'string.min': `تعداد کاراکترهای واحد محل خدمت ورودی کمتر از حد مجاز است `,
            'string.max': `تعداد کارکترهای واحد محل خدمت بیش از حد مجاز است`,           
            'any.required': `ورودی واحد محل خدمت اجباری است`
        }),
        specializedLevel: Joi.string().required().min(2).max(500).messages({
            'string.base': `نوع ورودی سمت(حوزه تخصصی)  صحیح نمی‌باشد`,
            'string.empty': `ورودی سمت(حوزه تخصصی)اجباری است`,
            'string.min': `تعداد کاراکترهای سمت(حوزه تخصصی) ورودی کمتر از حد مجاز است `,
            'string.max': `تعداد کارکترهای سمت(حوزه تخصصی) بیش از حد مجاز است`,           
            'any.required': `ورودی سمت(حوزه تخصصی) اجباری است`
        }),
        phone: Joi.string().required().messages({
            'string.base': `نوع ورودی  شماره موبایل صحیح نیست`,
            'string.empty': `شماره موبال اجباری است`,
            'any.required': `شماره موبال اجباری است`
        }),
        email: Joi.string().email().required({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ir', 'org'] } })
            .messages({
                'string.base': `نوع ورودی ایمیل نویسنده اشتباه است`,
                'string.empty': `ایمیل نویسنده اجباری است`,
                'any.required': `ایمیل نویسنده اجباری است`
            })
    });

    body.planId = planId;
    const schema = Joi.object().keys({
        companyName: Joi.string().min(1).messages({
            'string.base': `نوع نام شرکت صحیح نمی‌باشد`,
            'string.empty': `نام شرکت اجباری است`,
            'any.required': `نام شرکت اجباری است`,
            'string.min': `نام شرکت کوتاه است`
        }),
        abb: Joi.string().min(1).messages({
            'string.base': `نوع اختصار نام شرکت صحیح نمی‌باشد`,
            'string.min': `اختصار نام شرکت باید حداقل سه کاراکتر باشد `
        }),
        specializedField: Joi.string().messages({
            'string.base': `نوع حوزه تخصص شرکت صحیح نمی‌باشد`,
        }),
        companyEnvoy: Joi.string().messages({
            'string.base': `نوع نام نماینده شرکت صحیح نمی‌باشد`,
        }),
        planName: Joi.string().messages({
            'string.base': `نوع نام طرح صحیح نمی‌باشد`,
        }),
        field: Joi.string().messages({
            'string.base': `نوع حوزه طرح صحیح نمی‌باشد`,
        }),
        level: Joi.string().messages({
            'string.base': `نوع سطح طرح صحیح نمی‌باشد`,
        }),
        leagueCourse: Joi.string().messages({
            'string.base': `نوع دوره لیگ صحیح نمی‌باشد`,
        }),
        leagueStage: Joi.string().messages({
            'string.base': `نوع مرحله لیگ صحیح نمی‌باشد`,
        }),
        planNature: Joi.string().messages({
            'string.base': `نوع ماهیت طرح صحیح نمی‌باشد`,
        }),
        innovation: Joi.string().messages({
            'string.base': `نوع نوآوری طرح صحیح نمی‌باشد`,
        }),
        target: Joi.string().messages({
            'string.base': `نوع ورودی صحیح نمی‌باشد`,
        }),
        description: Joi.string().max(1000).messages({
            'string.base': `نوع توضیحات طرح صحیح نمی‌باشد`,
            'string.max': `خلاصه باید کوتاه و مختصر  باشد`
        }),
        status: Joi.string().messages({
            'string.base': `نوع وضعیت طرح صحیح نمی‌باشد`,
        }),
        undergraduateStatus: Joi.string().messages({
            'string.base': `نوع وضعیت کارشناسی صحیح نمی‌باشد`,
        }),
        companyNamePer: Joi.string().messages({
            'string.base': `نوع وضعیت طرح صحیح نمی‌باشد`,
        }),
        authors: Joi.array().items(author),
        planId: Joi.string().min(24).max(24).required().messages({
            'string.base': `نوع آیدی طرح درست  نیست`,
            'string.max': `آیدی طرح صحیح نیست`,
            'string.min': `آیدی طرح صحیح نیست`,
            'any.required': `آیدی طرح اجباری است`
        })
    })

    return schema.validate(body);
};


const validateLoadPlansPagination = async (query) => {
    const schema = Joi.object().keys({
        page: Joi.string().required().messages({
            'string.base': `نوع صفحه صحیح نمی‌باشد`,
            'any.required': `صفحه اجباری است`
        }),
        planUniqueName: Joi.string().min(6).max(1000).messages({
            'string.base': `نوع شناسه طرح صحیح نمی‌باشد`,
            'string.min': `تعداد کاراکتر های  شناسه طرح کمتراز حد مجاز است`,
            'string.max': `تعداد کاراکتر های  شناسه طرح بیشتر از حد مجاز است`,
        }),
        companyName: Joi.string().min(4).messages({
            'string.base': `نوع نام شرکت صحیح نمی‌باشد`,
            'string.empty': `نام شرکت اجباری است`,
            'string.min': `نام شرکت کوتاه است`
        }),
        abb: Joi.string().min(2).messages({
            'string.base': `نوع اختصار نام شرکت صحیح نمی‌باشد`,
            'string.min': `اختصار نام شرکت باید حداقل سه کاراکتر باشد `
        }),
        specializedField: Joi.string().messages({
            'string.base': `نوع حوزه تخصص شرکت صحیح نمی‌باشد`,
        }),
        companyEnvoy: Joi.string().messages({
            'string.base': `نوع نام نماینده شرکت صحیح نمی‌باشد`,
        }),
        planName: Joi.string().messages({
            'string.base': `نوع نام طرح صحیح نمی‌باشد`,
        }),
        field: Joi.string().messages({
            'string.base': `نوع حوزه طرح صحیح نمی‌باشد`,
        }),
        level: Joi.string().messages({
            'string.base': `نوع سطح طرح صحیح نمی‌باشد`,
        }),
        leagueCourse: Joi.string().messages({
            'string.base': `نوع دوره لیگ صحیح نمی‌باشد`,
        }),
        leagueStage: Joi.string().messages({
            'string.base': `نوع مرحله لیگ صحیح نمی‌باشد`,
        }),
        planNature: Joi.string().messages({
            'string.base': `نوع ماهیت طرح صحیح نمی‌باشد`,
        }),
        innovation: Joi.string().messages({
            'string.base': `نوع نوآوری طرح صحیح نمی‌باشد`,
        }),
        target: Joi.string().messages({
            'string.base': `نوع ورودی صحیح نمی‌باشد`,
        }),
        description: Joi.string().max(1000).messages({
            'string.base': `نوع توضیحات طرح صحیح نمی‌باشد`,
            'string.max': `خلاصه باید کوتاه و مختصر  باشد`
        }),
        status: Joi.string().messages({
            'string.base': `نوع وضعیت طرح صحیح نمی‌باشد`,
        }),
        getFiles: Joi.string().messages({
            'string.base': `نوع ورودی برای دریافت فایل ها نادرست است`
        }),
        issuedDate: Joi.string().messages({
            'string.base': `نوع ورودی برای زمان ثبت طرح صحیح نیست`
        })
    });
    return schema.validate(query);
};

const validateLoadPlans = async (query) => {
    const schema = Joi.object().keys({
        // page: Joi.string().required().messages({
        // page: Joi.string().messages({
        //     'string.base': `نوع صفحه صحیح نمی‌باشد`,
        //     'any.required': `صفحه اجباری است`
        // }),
        planUniqueName: Joi.string().min(6).max(1000).messages({
            'string.base': `نوع شناسه طرح صحیح نمی‌باشد`,
            'string.min': `تعداد کاراکتر های  شناسه طرح کمتراز حد مجاز است`,
            'string.max': `تعداد کاراکتر های  شناسه طرح بیشتر از حد مجاز است`,
        }),
        companyName: Joi.string().min(1).messages({
            'string.base': `نوع نام شرکت صحیح نمی‌باشد`,
            'string.empty': `نام شرکت اجباری است`,
            'string.min': `نام شرکت کوتاه است`
        }),
        abb: Joi.string().min(2).messages({
            'string.base': `نوع اختصار نام شرکت صحیح نمی‌باشد`,
            'string.min': `اختصار نام شرکت باید حداقل سه کاراکتر باشد `
        }),
        specializedField: Joi.string().messages({
            'string.base': `نوع حوزه تخصص شرکت صحیح نمی‌باشد`,
        }),
        companyEnvoy: Joi.string().messages({
            'string.base': `نوع نام نماینده شرکت صحیح نمی‌باشد`,
        }),
        planName: Joi.string().messages({
            'string.base': `نوع نام طرح صحیح نمی‌باشد`,
        }),
        field: Joi.string().messages({
            'string.base': `نوع حوزه طرح صحیح نمی‌باشد`,
        }),
        level: Joi.string().messages({
            'string.base': `نوع سطح طرح صحیح نمی‌باشد`,
        }),
        leagueCourse: Joi.string().messages({
            'string.base': `نوع دوره لیگ صحیح نمی‌باشد`,
        }),
        leagueStage: Joi.string().messages({
            'string.base': `نوع مرحله لیگ صحیح نمی‌باشد`,
        }),
        planNature: Joi.string().messages({
            'string.base': `نوع ماهیت طرح صحیح نمی‌باشد`,
        }),
        innovation: Joi.string().messages({
            'string.base': `نوع نوآوری طرح صحیح نمی‌باشد`,
        }),
        target: Joi.string().messages({
            'string.base': `نوع ورودی صحیح نمی‌باشد`,
        }),
        description: Joi.string().max(1000).messages({
            'string.base': `نوع توضیحات طرح صحیح نمی‌باشد`,
            'string.max': `خلاصه باید کوتاه و مختصر  باشد`
        }),
        status: Joi.string().messages({
            'string.base': `نوع وضعیت طرح صحیح نمی‌باشد`,
        }),
        getFiles: Joi.string().messages({
            'string.base': `نوع ورودی برای دریافت فایل ها نادرست است`
        }),
        issuedDate: Joi.string().messages({
            'string.base': `نوع ورودی برای زمان ثبت طرح صحیح نیست`
        })
    });
    return schema.validate(query);
};

const validateLoadPlan = async (body) => {
    const schema = Joi.object().keys({
        planId: Joi.string().required().messages({
            'string.base': `نوع آیدی طرح اشتباه است`,
            'any.required': `آیدی طرح اجباری است`
        })
    });
    return schema.validate(body);
}

const validateUpdateCeoCheck = async (body, planId) => {
    body.planId = planId;
    const schema = Joi.object().keys({
        planId: Joi.string().required().messages({
            'string.base': `نوع آیدی طرح اشتباه است`,
            'any.required': `آیدی طرح اجباری است`
        }),
        status: Joi.string().min(1).max(3).required().messages({
            'string.base': `نوع کد وضعیت اشتباه است`,
            'any.required': `وضعیت طرح اجباری است`,
        })
    })
    return schema.validate(body);
}

const validateUpdateAdminCheck = async (body, planId) => {
    body.planId = planId;
    const schema = Joi.object().keys({
        planId: Joi.string().required().messages({
            'string.base': `نوع آیدی طرح اشتباه است`,
            'any.required': `آیدی طرح اجباری است`
        }),
        identityConfirmation: Joi.boolean().messages({
            'boolean.base': `نوع ورودی صحیح نیست`,
        }),
        groupingConfirmation: Joi.boolean().messages({
            'boolean.base': `نوع ورودی صحیح نیست`,
        }),
        documentsConfirmation: Joi.boolean().messages({
            'boolean.base': `نوع ورودی صحیح نیست`,
        }),
        context: Joi.string().messages({
            'string.base': `نوع متن ورودی برای ایمیل و پیامک اشتباه است`,
        })
    })
    return schema.validate(body);
}

const validateGetFile = async (body) => {
    const schema = Joi.object().keys({
        planUniqueName: Joi.string().required().messages({
            'string.base': `نوع شناسه طرح صحیح نمی‌باشد`,
            'string.empty': `شناسه طرح اجباری است`,
            'any.required': `شناسه طرح اجباری است`
        }),
        fileName: Joi.string().required().messages({
            'string.base': `نوع نام فایل صحیح نمی‌باشد`,
            'string.empty': `نام فایل اجباری است`,
            'any.required': `نام فایل اجباری است`
        }),
    });

    return schema.validate(body)
}


module.exports = {
    validateCreatePlan,
    validateLoadPlan,
    validateUpdatePlan,
    validateUpdateCeoCheck,
    validateUpdateAdminCheck,
    validateLoadPlans,
    validateGetFile,
    validateLoadPlansPagination,
}