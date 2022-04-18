const bcrypt = require('bcrypt');
const { createError } = require("../../../utility/error/errorHandling");
const { GlobalExceptions } = require("../../../utility/error/exceptions");
const { getFileType } = require('../../../utility/files');
const { register, isUsernameExists, isEmailExists, loadUser, loadUserById, deleteUser, updateUser, resetPassword } = require("../atomicServices/iam");
const { createToken, verifyRefreshToken } = require("../auth/jwt");
const { craeteProfileImg, getUserProfile, updateProfile } = require('../infra/files');

const wsRegister = async (name, family, sex, age, graduation, graduationField, nationalId, personnelId, companyName, organizationLevel, mobile, email, type, username, password, files) => {
    if (await isEmailExists(email)) {
        throw createError(GlobalExceptions.iam.EmailExists)
    }
    if (await isUsernameExists(username)) {
        throw createError(GlobalExceptions.iam.UsernameExists)
    }
    switch (companyName) {
        case "BSM":
            companyNamePer = "بهسازان ملت";
            break;
        case "BPM":
            companyNamePer = "به پرداخت ملت";
            break;
        case "SYS":
            companyNamePer = "مهندسی سیستم یاس";
            break;
        case "YaasSie":
            companyNamePer = "مهندسی صنایع یاس ارغوانی";
            break;
        case "SITS":
            companyNamePer = "زیرساخت امن خدمات تراکنشی";
            break;
        case "SHGH":
            companyNamePer = "مهندسی نرم افزار شقایق";
            break;
        default:
            companyNamePer = "پل وینو";
    }



    let user = await register(name, family, sex, age, graduation,
        graduationField, nationalId, personnelId, companyName, companyNamePer, organizationLevel,
        mobile, email, type, username, password);
    try {
        await craeteProfileImg(files[0], username);
    }
    catch (e) {
        await deleteUser(user._id);
        throw createError(GlobalExceptions.iam.profileImageNotCreated);
    }
    return {
        userId: user._id,
        name: user.name,
        family: user.family,
        nationalId: user.nationalId,
        personnelId: user.personnelId,
        companyName: user.companyName,
        organizationLevel: user.organizationLevel,
        email: user.email,
        username: user.username,
        type: user.type
    };
}


const wsLogin = async (username, password, refreshToken) => {
    const user = await isUsernameExists(username);
    if (!user) {        
        throw createError(GlobalExceptions.iam.UserNotFound);
    }
    if (password) {
        if (!await bcrypt.compare(password, user.password)) {
            throw createError(GlobalExceptions.iam.WrongCredential)
        }
    } else if (refreshToken) {
        const refToken = await verifyRefreshToken(username, refreshToken);
        if (!refToken) {
            throw createError(GlobalExceptions.iam.WrongCredential)
        }
    }
    else {
        throw createError(GlobalExceptions.iam.WrongCredential)
    }

    const authorize = await createToken(user.username, user.userId);

    let abb;
    switch (user.companyName) {
        case "BSM":
            abb = "BSM";
            break;
        case "BPM":
            abb = "BPM";
            break;
        case "SYS":
            abb = "SYS";
            break;
        case "YaasSie":
            abb = "YaasSie";
            break;
        case "SITS":
            abb = "SITS";
            break;
        case "SHGH":
            abb = "SHGH";
            break;
        default:
            abb = "BSM";
    }
    return {
        token: authorize.token,
        refToken: authorize.refreshToken,
        result: {
            userId: user._id,

            name: user.name,
            family: user.family,
            nationalId: user.nationalId,
            personnelId: user.personnelId,
            companyName: user.companyName,
            companyNamePer: user.companyNamePer,
            abb: abb,
            organizationLevel: user.organizationLevel,
            type: user.type,
            email: user.email,
            username: user.username
        }
    }
}

const wsLoadUser = async (name, family, sex, graduation, nationalId, personnelId, companyName, username) => {
    const user = await loadUser(name, family, sex, graduation, nationalId, personnelId, companyName, username);
    if (username) {
        return user.map((u) => {
            let organizationLevelName;
            switch (u.organizationLevel) {
                case "envoy":
                    organizationLevelName = "نماینده شرکت";
                    break;
                case "admin":
                    organizationLevelName = "ادمین";
                    break;
                case "ceo":
                    organizationLevelName = "مدیرعامل";
                    break;
                default:
                    organizationLevelName = "کاربر";
            }

            const {profile, buffer} = getUserProfile(u.username);
            const fileType = getFileType(profile.split('.').pop());
            if(profile && buffer) {
                return {
                    userId: u._id,
                    name: u.name,
                    family: u.family,
                    nationalId: u.nationalId,
                    personnelId: u.personnelId,
                    companyName: u.companyName,
                    companyNamePer: u.companyNamePer,
                    organizationLevel: u.organizationLevel,
                    organizationLevelName: organizationLevelName,
                    email: u.email,
                    username: u.username,
                    image: {
                        fileName: profile,
                        type: fileType,
                        data: buffer
                    }
                };
            }
        });
    }
    else {
        return user.map(u => {
      let organizationLevelName;

            switch (u.organizationLevel) {
                case "envoy":
                    organizationLevelName = "نماینده شرکت";
                    break;
                case "admin":
                    organizationLevelName = "ادمین";
                    break;
                case "ceo":
                    organizationLevelName = "مدیرعامل";
                    break;
                default:
                    organizationLevelName = "کاربر";
            }
            const {profile, buffer} = getUserProfile(u.username);
            if(profile && buffer) {
                const fileType = getFileType(profile.split('.').pop());
                return {
                    userId: u._id,
                    name: u.name,
                    family: u.family,
                    nationalId: u.nationalId,
                    personnelId: u.personnelId,
                    companyName: u.companyName,
                    companyNamePer: u.companyNamePer,
                    organizationLevel: u.organizationLevel,
                    organizationLevelName: organizationLevelName,
                    email: u.email,
                    username: u.username,
                    image: {
                        fileName: profile,
                        type: fileType,
                        data: buffer
                    }
                };
            }
        });
    }
}

const wsLoadUserById = async (userId) => {
    const user = await loadUserById(userId);
    let organizationLevelName;
    switch (user.organizationLevel) {
        case "envoy":
            organizationLevelName = "نماینده شرکت";
            break;
        case "admin":
            organizationLevelName = "ادمین";
            break;
        case "ceo":
            organizationLevelName = "مدیرعامل";
        default:
            organizationLevelName = "کاربر";
    }
    const {profile, buffer} = getUserProfile(user.username);
    const fileType = getFileType(profile.split('.').pop());
    return {
        userId: user._id,
        name: user.name,
        family: user.family,
        sex: user.sex,
        age: user.age,
        graduation: user.graduation,
        graduationField: user.graduationField,
        nationalId: user.nationalId,
        personnelId: user.personnelId,
        companyName: user.companyName,
        companyNamePer: user.companyNamePer,
        organizationLevel: user.organizationLevel,
        organizationLevelName: organizationLevelName,
        mobile: user.mobile,
        email: user.email,
        type: user.type,
        username: user.username,
        image: {
            fileName: profile,
            type: fileType,
            data: buffer
        }
    };
}

const wsUpdateUser = async (userId, name, family, sex, age, graduation, graduationField,
    nationalId, personnelId, companyName, organizationLevel, mobile, email, type,
    username, password, files) => {
    const oldUser = await loadUserById(userId);

    //put validation on password?
    const user = await updateUser(userId, name, family, sex, age, graduation, graduationField,
        nationalId, personnelId, companyName, organizationLevel, mobile, email, type,
        username, password);

    let userImageUrl = '';
    if (files) {
        if (oldUser.username != user.username) {
            userImageUrl = await updateProfile(files[0], oldUser.username, username);
        }
        else {
            userImageUrl = await updateProfile(files[0], oldUser.username);
        }
        return {
            userId: user._id,
            name: user.name,
            family: user.family,
            nationalId: user.nationalId,
            personnelId: user.personnelId,
            companyName: user.companyName,
            organizationLevel: user.organizationLevel,
            email: user.email,
            username: user.username,
            userImageUrl: userImageUrl
        };
    }
    else {
        return {
            userId: user._id,
            name: user.name,
            family: user.family,
            nationalId: user.nationalId,
            personnelId: user.personnelId,
            companyName: user.companyName,
            organizationLevel: user.organizationLevel,
            email: user.email,
            username: user.username,
        };
    }
}

const wsResetPass = async (username) => {
    await resetPassword(username);
}

module.exports = { wsRegister, wsLogin, wsLoadUser, wsLoadUserById, wsUpdateUser, wsResetPass }