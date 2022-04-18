const { GlobalExceptions } = require("../../../utility/error/exceptions");
const { createError } = require("../../../utility/error/errorHandling");
const { createPlan, deletePlan, getLastPlanIndex, loadPlan, loadPlans, updateAdminCheck, updatePlan, getPlansByStatus, setStatus, checkPlanExists, getCompanyEnvoy, loadPlansPagination } = require("../atomicServices/plan");
const { createFiles, mkUnique } = require("../infra/files");
const { sendMail } = require("../infra/email");
const { sendSms } = require("../infra/sms");
const { statuses } = require("../../../utility/statuses");
const { Plan } = require("../model/plan");
const { getSecurityKeys } = require('../infra/getKeys');
const { deleteFolder, renameFolder } = require('../../../utility/files');
const { User } = require("../../iam/model/iam");
const { logger } = require("../../../utility/logging");



const wsCreatePlan = async (
    abb, specializedField, companyEnvoy, authors,
    planName, field, level, leagueCourse,leagueStage, planNature,
    innovation, target, description, files) => {
    let planIndex;
    let companyName;
    let plan;

    if(!files || (files && files.length == 0)){
        throw createError(GlobalExceptions.plan.fileObligation);
    }
      switch (abb) {
        case "BSM":
            companyName = "BSM";
            companyNamePer = "بهسازان ملت";
            break;
        case "BPM":
            companyName = "BPM";
            companyNamePer = "به پرداخت ملت";
            break;
        case "SYS":
            companyName = "SYS";
            companyNamePer = "مهندسی سیستم یاس";
            break;
        case "YaasSie":
            companyName = "YaasSie";
            companyNamePer = "مهندسی صنایع یاس ارغوانی";
            break;
        case "SITS":
            companyName = "SITS";
            companyNamePer = "زیرساخت امن خدمات تراکنشی";
            break;
        case "SHGH":
            companyName = "SHGH";
            companyNamePer = "مهندسی نرم افزار شقایق";
            break;
        default:
            companyName = "نامشخص";
            companyNamePer = "نامشخص";
    }
    try {
        planIndex = await getLastPlanIndex(companyName);
        plan = await createPlan(companyName,companyNamePer,
            abb, specializedField, companyEnvoy, authors,
            planName, field, level, leagueCourse, leagueStage, planNature,
            innovation, target, description, planIndex);
    }
    catch(e) {
        throw createError(GlobalExceptions.plan.planNotCreated);
    }

    try {
        const key = await getSecurityKeys();
        const uniqueFolder = mkUnique(abb, planIndex, planNature);
        const { documentsUrl } = await createFiles(files, uniqueFolder, key);
    }
    catch (e) {
        deletePlan(plan._id);
        throw createError(GlobalExceptions.file.inavalidFile);
    }
    return {
        planId: plan._id
    };
}




const wsLoadPlansPagination = async (page, companyName, abb, specializedField, companyEnvoy,
    field, level, leagueCourse, leagueStage, planNature, innovation, status, issuedDate, adminConfirmation,undergraduateStatus) => {
    const { plans, count } = await loadPlansPagination(page, companyName, abb, specializedField, companyEnvoy,
        field, level, leagueCourse, leagueStage, planNature, innovation, status, issuedDate, adminConfirmation,undergraduateStatus);

    const result = plans.map(p => {
        switch (p.planNature) {
            case "RD":
                planNatureName = "مطالعه و پژوهش";
                break;
            case "IDEA":
                planNatureName = "ایده";
                break;
            case "MVP":
                planNatureName = "محصول اولیه";
                break;
            case "CP":
                planNatureName = "محصول نهایی";
                break;

            default:
                planNatureName = "نامشخص";
        }

        switch (p.undergraduateStatus) {
            case "WExpert":
                undergraduateStatusName = "در انتظار کارشناسی";
                break;
            case "UExpert":
                undergraduateStatusName = "در حال کارشناسی";
                break;
            case "WPJudge":
                undergraduateStatusName = "در انتظار داوری مقدماتی";
                break;
            case "UPJudge":
                undergraduateStatusName = "در حال داوری مقدماتی";
                break;
            case "WFJudge":
                undergraduateStatusName = "در انتظار داوری نهایی";
                break;
            case "UFJudge":
                undergraduateStatusName = "در حال داوری نهایی";
                break;
        }

        return {
            planId: p._id,
            companyName: p.companyName,
            companyNamePer:p.companyNamePer,
            abb: p.abb,
            specializedField: p.specializedField,
            companyEnvoy: p.companyEnvoy,
            authors: p.authors,
            planName: p.planName,
            field: p.field,
            level: p.level,
            leagueCourse : p.leagueCourse,
            leagueStage :p.leagueStage,
            planNature: p.planNature,
            planNatureName: planNatureName,
            innovation: p.innovation,
            target: p.target,
            description: p.description,
            status: p.status,
            planIndex: p.planIndex,
            issuedDate: p.issuedDate,
            undergraduateStatus: p.undergraduateStatus,
            undergraduateStatusName: undergraduateStatusName,
            planUniqueName: `${p.abb}-${p.planIndex}-${p.planNature}`
        }
    })
    return { result, count };
}


const wsLoadPlans = async (companyName, abb, specializedField, companyEnvoy,
    field, level, leagueCourse, leagueStage, planNature, innovation, status, issuedDate, adminConfirmation) => {
    const plans = await loadPlans(companyName, abb, specializedField, companyEnvoy,
        field, level, leagueCourse, leagueStage, planNature, innovation, status, issuedDate, adminConfirmation);

    const result = plans.map(p => {

        switch (p.planNature) {
            case "RD":
                planNatureName = "مطالعه و پژوهش";
                break;
            case "IDEA":
                planNatureName = "ایده";
                break;
            case "MVP":
                planNatureName = "محصول اولیه";
                break;
            case "CP":
                planNatureName = "محصول نهایی";
                break;

            default:
                planNatureName = "نامشخص";
        }
        switch (p.level) {
            case "1":
                levelName = "محصول";
                break;
            case "2":
                levelName = "کسب و کار";
                break;
            case "3":
                levelName = "خدمات ارزش افزوده";
                break;
            case "4":
                levelName = "فرآیند";
                break;
    
            default:
                levelName = "0";
        }
        switch (p.field) {
            case "1":
                fieldName = "فناوری‌های جدید";
                break;
            case "2":
                fieldName = "فناوری‌های مالی (عمومی)";
                break;
            case "3":
                fieldName = "بانکداری";
                break;
            case "4":
                fieldName = "پرداخت";
                break;
    
            default:
                fieldName = "0";
        }


        return {
            planId: p._id,
            companyName: p.companyName,
            companyNamePer:p.companyNamePer,
            abb: p.abb,
            specializedField: p.specializedField,
            companyEnvoy: p.companyEnvoy,
            authors: p.authors,
            planName: p.planName,
            field: p.field,
            fieldName: fieldName,
            level: p.level,
            leagueCourse : p.leagueCourse,
            leagueStage : p.leagueStage,
            levelName: levelName,
            planNature: p.planNature,
            planNatureName: planNatureName,
            innovation: p.innovation,
            target: p.target,
            description: p.description,
            status: p.status,
            planIndex: p.planIndex,
            issuedDate: p.issuedDate,
            planUniqueName: `${p.abb}-${p.planIndex}-${p.planNature}`
        }
    })
    return result;
}

const wsLoadPlan = async (planId) => {
    const plan = await loadPlan(planId);    
    let planNatureName;
    switch (plan.planNature) {
        case "RD":
            planNatureName = "مطالعه و پژوهش";
            break;
        case "IDEA":
            planNatureName = "ایده";
            break;
        case "MVP":
            planNatureName = "محصول اولیه";
            break;
        case "CP":
            planNatureName = "محصول نهایی";
            break;

        default:
            planNatureName = "نامشخص";
    }

    switch (plan.level) {
        case "1":
            levelName = "محصول";
            break;
        case "2":
            levelName = "کسب و کار";
            break;
        case "3":
            levelName = "خدمات ارزش افزوده";
            break;
        case "4":
            levelName = "فرآیند";
            break;

        default:
            levelName = "0";
    }
    switch (plan.field) {
        case "1":
            fieldName = "فناوری‌های جدید";
            break;
        case "2":
            fieldName = "فناوری‌های مالی (عمومی)";
            break;
        case "3":
            fieldName = "بانکداری";
            break;
        case "4":
            fieldName = "پرداخت";
            break;

        default:
            fieldName = "0";
    }

    return {
        planId: planId,
        companyName: plan.companyName,
        companyNamePer:plan.companyNamePer,
        abb: plan.abb,
        specializedField: plan.specializedField,
        companyEnvoy: plan.companyEnvoy,
        authors: plan.authors,
        planName: plan.planName,
        field: plan.field,
        fieldName: fieldName,
        level: plan.level,
        leagueCourse : plan.leagueCourse,
        leagueStage : plan.leagueStage,
        levelName: levelName,
        planNature: plan.planNature,
        planNatureName: planNatureName,
        innovation: plan.innovation,
        target: plan.target,
        description: plan.description,
        status: plan.status,
        planIndex: plan.planIndex,
        issuedDate: plan.issuedDate,
        planUniqueName: `${plan.abb}-${plan.planIndex}-${plan.planNature}`
    }
}

const wsUpdatePlan = async (planId, companyName, abb, specializedField,
    planName, field, level, leagueCourse, leagueStage, planNature, companyEnvoy, innovation,
    target, description, authors, status,undergraduateStatus, files) => {

       

    if (!await checkPlanExists(planId)) {
        throw createError(GlobalExceptions.plan.planNotFound);
    }

    let inputFields = {};

    if (companyName) inputFields.companyName = companyName;
    if (abb) inputFields.abb = abb;
    if (specializedField) inputFields.specializedField = specializedField;
    if (planName) inputFields.planName = planName;
    if (field) inputFields.field = field;
    if (level) inputFields.level = level;
    if (leagueCourse) inputFields.leagueCourse = leagueCourse;
    if (leagueStage) inputFields.leagueStage = leagueStage;
    if (planNature) inputFields.planNature = planNature;
    if (companyEnvoy) inputFields.companyEnvoy = companyEnvoy;
    if (innovation) inputFields.innovation = innovation;
    if (target) inputFields.target = target;
    if (description) inputFields.description = description;
    if (authors) inputFields.authors = authors;
    if (status) inputFields.status = status;
    if (undergraduateStatus) inputFields.undergraduateStatus = undergraduateStatus;

    if (files && files.length > 0) {
        try {
            const oldPlan = await loadPlan(planId);
            let uniqueFolder = mkUnique(oldPlan.abb, oldPlan.planIndex, oldPlan.planNature);
            deleteFolder("files", `${oldPlan.abb}-${oldPlan.planIndex}-${oldPlan.planNature}`);
            const key = await getSecurityKeys();
            if (planNature && planNature != oldPlan.planNature) {
                uniqueFolder = mkUnique(oldPlan.abb, oldPlan.planIndex, planNature);
            }
            const { documentsUrl } = await createFiles(files, uniqueFolder, key);
        }
        catch (e) {
            console.log(e);
            throw createError(GlobalExceptions.file.inavalidFile)
        }
    }

    else {
        const oldPlan = await loadPlan(planId);
        if (planNature != oldPlan.planNature) {
            const planUniqueName = `${oldPlan.abb}-${oldPlan.planIndex}-${oldPlan.planNature}`
            const newUniqueFolder = `${oldPlan.abb}-${oldPlan.planIndex}-${planNature}`;
            renameFolder("files", planUniqueName, newUniqueFolder);
        }
    }
    const updatedPlan = await updatePlan(planId, inputFields);
    return;
}

const wsUpdateAdminCheck = async (planId, identityConfirmation, groupingConfirmation, documentsConfirmation, context = null) => {
    try {
        if (identityConfirmation === true && groupingConfirmation === true && documentsConfirmation === true) {
            const plan = await updateAdminCheck(planId, identityConfirmation, groupingConfirmation, documentsConfirmation);
            const updatedPlan = await setStatus(planId, statuses.adminAccept, true);
            const [email, mobile] = await getCompanyEnvoy(plan.companyEnvoy);
            await sendMail(email, context);
            await sendSms(mobile, context);
            return updatedPlan;
        }
        else if (identityConfirmation === false && groupingConfirmation === false && documentsConfirmation === false) {
            const plan = await updateAdminCheck(planId, identityConfirmation, groupingConfirmation, documentsConfirmation);
            const updatedPlan = await setStatus(planId, statuses.adminReject, true);
            const [email, mobile] = await getCompanyEnvoy(plan.companyEnvoy);
            await sendMail(email, context);
            await sendSms(mobile, context);
            return updatedPlan;
        }
        else if (identityConfirmation === false || groupingConfirmation === false || documentsConfirmation === false) {
            const plan = await updateAdminCheck(planId, identityConfirmation, groupingConfirmation, documentsConfirmation);
            const updatedPlan = await setStatus(planId, statuses.adminIncomplete, true);
            const [email, mobile] = await getCompanyEnvoy(plan.companyEnvoy);
            await sendMail(email, context);
            await sendSms(mobile, context);
            return updatedPlan;
        }
    }
    catch {
        throw createError(GlobalExceptions.plan.planConfirmation);
    }
}



const wsCeoCheck = async (planId, status) => {
    const plan = Plan.findOne({ _id: planId });
    if (plan) {
        if (status === "2") return await setStatus(planId, statuses.ceoAccept, sendBack = true);
        if (status === "3") return await setStatus(planId, statuses.ceoReject, sendBack = true);
        if (status === "4") return await setStatus(planId, statuses.sysAccept, sendBack = true);
    }
}

const getCeoConfirmation = async () => {
    const currentTime = Date.now() / 1000;
    const deadLine = 3 * 24 * 3600; // 72 hours  
    console.log("run getCeoConfirmation...");
    try{
        const toCeoPlans = await getPlansByStatus(statuses.toCeo);
        for (var i = 0; i < toCeoPlans.length; i++) {
            const issuedDate = toCeoPlans[i].issuedDate / 1000;
            if (currentTime >= (issuedDate + deadLine)) {
                await setStatus(toCeoPlans[i]._id, statuses.sysAccept, sendBack = false);
                console.log("plan id:", toCeoPlans[i]._id, " updated!")
            }
        }
    }
    catch(error){
        logger.error("errorrrrrrrrrr");
    }
}

try {
    setInterval(async () => {
        await getCeoConfirmation();
    },
    1000 * 3600 * 8);  //8 hours   1000 * 3600 * 8
}
catch {
    throw createError(GlobalExceptions.plan.ceoConfirmation);
}


module.exports = { wsCreatePlan, wsLoadPlan, wsLoadPlansPagination, wsUpdatePlan, wsLoadPlans, wsUpdateAdminCheck, wsCeoCheck };

