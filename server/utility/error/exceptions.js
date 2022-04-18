const GlobalExceptions = {
    ServiceError: {
        code: 1, message: 'خطایی سمت سرور رخ داده‌است', httpStatusCode: 500,
    },
    //-- authExceptions---
    auth: {
        TokenExpired: {
            code: 6, message: 'مجددا وارد شوید', httpStatusCode: 401, httpStatusMessage: 'Unauthorized'
        },
        WrongAccessToken: {
            code: 7, message: 'اطلاعات وارد شده اشتباه است', httpStatusCode: 401, httpStatusMessage: 'Unauthorized'
        },
        AccessTokenError: {
            code: 8, message: 'خطای احراز', httpStatusCode: 401, httpStatusMessage: 'Unauthorized'
        },
    },
    //-- jwtExceptions---
    jwt: {
        NotAuthorized: {
            code: 13, message: 'دسترسی مجاز نمی باشد', httpStatusCode: 401
        },
        WrongCredential: {
            code: 14, message: 'رمز وارد شده صحیح نمی باشد', httpStatusCode: 403
        },
        invalidAuthorizationHeader: {
            code: 5, message: 'Invalid Authorization Header', httpStatusCode: 400
        }
    },
    iam: {
        EmailExists: {
            code: 20, message: 'ایمیلی بااین مشخصات قبلا ثبت شده‌است', httpStatusCode: 409
        },
        UsernameExists: {
            code: 21, message: 'نام کاربری بااین مشخصات قبلا ثبت شده‌است', httpStatusCode: 409
        },
        UserNotFound: {
            code: 21, message: 'نام کاربری یا رمز عبور اشتباه است', httpStatusCode: 409
        },
        WrongCredential: {
            code: 21, message: 'نام کاربری بااین مشخصات یافت نشد', httpStatusCode: 409

        },
        profileImageNotCreated: {
            code: 21, message: 'خطای در ذخیره عکس پروفایل رخ داده است', httpStatusCode: 409
        }
    },
    file: {
        fileNotCreated: {
            code: 22, message: 'فایل طرح ذخیره نشد', httpStatusCode: 500
        },
        planFileUpdateFailed: {
            code: 25, message: `خطایی در آپدیت فایل های طرح رخ داده است`, httpStatusCode: 500
        },
        fileNotFound: {
            code: 25, message: `فایلی یافت نشد`, httpStatusCode: 500
        },
        inavalidFile: {
            code: 25, message: `فایل ارسالی نامعتبر است`, httpStatusCode: 500
        }
    },
    plan: {
        planNotCreated: {
            code: 23, message: `طرح ثبت نشد`, httpStatusCode: 500
        },
        planConfirmation: {
            code: 24, message: `مشکلی در مرحله تایید ادمین به وجود آمده است`, httpStatusCode: 500
        },
        ceoConfirmation: {
            code: 25, message: `مشکلی در مرحله تایید مدیر شرکت به وجودآمده است`, httpStatusCode: 500
        },
        planNotFound: {
            code: 25, message: `آیدی طرح یافت نشد`, httpStatusCode: 500
        },
        fileObligation: {
            code: 25, message: ` فایل طرح الزامی است`, httpStatusCode: 500
        },
    },
    db: {
        InputsNotUnique: {
            code: 2, message: 'مقادیر ورودی یکتا نیستند', httpStatusCode: 409
        },
        InputNotValide: {
            code: 3, message: 'تایپ مقادیر ورودی صحیح نمی باشد', httpStatusCode: 409
        },
        DataBaseError: {
            code: 5, message: 'خطای دیتابیس', httpStatusCode: 409
        }
    },
    context: {
        winner: {
            winnerNotCreated: {
                code: 5, message: 'عکس ارسالی نامعتبر است', httpStatusCode: 409
            }
        },
        selectedProfiles: {
            selectedProfilesNotCreated: {
                code: 5, message: 'عکس ارسالی نامعتبر است', httpStatusCode: 409
            }
        },
        judge: {
            judgeNotCreated: {
                code: 5, message: 'عکس ارسالی نامعتبر است', httpStatusCode: 409
            }
        },
        info: {
            infoNotCreated: {
                code: 5, message: 'عکس ارسالی نامعتبر است', httpStatusCode: 409
            }
        },
        gallery: {
            galleryNotCreated: {
                code: 5, message: 'عکس ارسالی نامعتبر است', httpStatusCode: 409
            }
        },
        about: {
            aboutNotFound: {
                code: 5, message: 'عکس ارسالی نامعتبر است', httpStatusCode: 404
            },
            aboutPicNotCreated: {
                code: 5, message: 'عکس ارسالی نامعتبر است', httpStatusCode: 404
            },
            aboutPicNotUpdate: {
                code: 5, message: 'عکس ارسالی نامعتبر است', httpStatusCode: 404
            }
        },
        news: {
            newsPicNotCreated: {
                code: 5, message: 'عکس ارسالی نامعتبر است', httpStatusCode: 404
            },
            NewsNotFound:{
                code: 5, message: 'خبری با این مشخصات یافت نشد', httpStatusCode: 404

            }
        }

    }
}


module.exports = { GlobalExceptions }