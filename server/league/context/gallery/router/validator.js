const Joi = require('joi');


const validateCreateGallery = async (body) => {
    const schema = Joi.object().keys({
        context: Joi.string().required().messages({
            'string.base': `نوع ورودی متن گالری تصاویر صحیح نمی‌باشد`,
            'string.empty': `ورودی متن گالری تصاویر اجباری است`,
            'any.required': `ورودی متن گالری تصاویر اجباری است`
        }),
        round: Joi.string().required().messages({
            'string.base': `نوع ورودی دوره لیگ صحیح نمی‌باشد`,
            'string.empty': `ورودی دوره لیگ اجباری است`,
            'any.required': `ورودی دوره لیگ اجباری است`
        }),
    })

    return schema.validate(body);
}


const validateUpdateGallery = async (body, galleryId) => {
    body.galleryId = galleryId;
    const schema = Joi.object().keys({
        context: Joi.string().messages({
            'string.base': `نوع ورودی متن گالری تصاویر صحیح نمی‌باشد`,
            'string.empty': `ورودی متن گالری تصاویر اجباری است`,
            'any.required': `ورودی متن گالری تصاویر اجباری است`
        }),
        round: Joi.string().messages({
            'string.base': `نوع ورودی دوره لیگ صحیح نمی‌باشد`,
            'string.empty': `ورودی دوره لیگ اجباری است`,
            'any.required': `ورودی دوره لیگ اجباری است`
        }),
        galleryId: Joi.string().required().messages({
            'any.required': `آیدی گالری تصاویر اجباری میباشد`,
        })
    });
    return schema.validate(body);
};


const validateDeleteGallery = async (body) => {
    const schema = Joi.object().keys({
        galleryId: Joi.string().required().messages({
            'string.base': `نوع آیدی گالری تصاویر اشتباه است`,
            'any.required': `آیدی گالری تصاویر اجباری است`
        }),
    })
    return schema.validate(body);
};


module.exports = { validateCreateGallery, validateUpdateGallery, validateDeleteGallery}