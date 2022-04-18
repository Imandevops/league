const { dbErrorHandling } = require('../../../utility/error/dbError');
const { Plan } = require('../model/plan');


const createPlan = async (companyName,companyNamePer,
    abb, specializedField, companyEnvoy, authors,
    planName, field, level, leagueCourse,leagueStage, planNature,
    innovation, target, description, planIndex) => {
    try {
        
        let plan = new Plan({
            companyName: companyName,
            companyNamePer:companyNamePer,
            abb: abb,
            specializedField: specializedField,
            companyEnvoy: companyEnvoy,
            authors: authors,
            planName: planName,
            field: field,
            level: level,
            leagueCourse : leagueCourse,
            leagueStage : leagueStage,
            planNature: planNature,
            innovation: innovation,
            target: target,
            description: description,
            planIndex: planIndex,
            issuedDate: new Date().getTime()
        });
        plan = await plan.save();

        return plan;
    }

    catch (error) {
        await dbErrorHandling(error);
    }
}


const getLastPlanIndex = async (companyName) => {
    let planIndex = 1;
    const plans = await Plan.find({ companyName });
    if (plans != null) {
        planIndex = plans.length + 1;
    }
    return planIndex;
}

const deletePlan = async (planId) => {
    await Plan.findOneAndDelete({ _id: planId });
    console.log("plan deleted");
}

const loadPlans = async (companyName, abb, specializedField, companyEnvoy,
    field, level, leagueCourse,leagueStage, planNature, innovation, status, issuedDate) => {
    const query = {};
    if (companyName) query.companyName = companyName;
    if (abb) query.abb = abb;
    if (specializedField) query.specializedField = specializedField;
    if (companyEnvoy) query.companyEnvoy = companyEnvoy;
    if (field) query.field = field;
    if (issuedDate) query.issuedDate = issuedDate;
    if (level) query.level = level;
    if (leagueCourse) query.leagueCourse = leagueCourse;
    if (leagueStage) query.leagueStage = leagueStage;
    if (planNature) query.planNature = planNature;
    if (innovation) query.innovation = innovation;
    if (status) query.status = status;

    return await Plan.find(query);
}

const loadPlansPagination = async (page, companyName, abb, specializedField, companyEnvoy,
    field, level, leagueCourse,leagueStage, planNature, innovation, status, issuedDate,undergraduateStatus) => {
    let offset = 10 * parseInt(page);
    const query = {};
    if (companyName) query.companyName = companyName;
    if (abb) query.abb = abb;
    if (specializedField) query.specializedField = specializedField;
    if (companyEnvoy) query.companyEnvoy = companyEnvoy;
    if (field) query.field = field;
    if (issuedDate) query.issuedDate = issuedDate;
    if (level) query.level = level;
    if (leagueCourse) query.leagueCourse = leagueCourse;
    if (leagueStage) query.leagueStage = leagueStage;
    if (planNature) query.planNature = planNature;
    if (innovation) query.innovation = innovation;
    if (status) query.status = status;
    if (undergraduateStatus) query.undergraduateStatus = undergraduateStatus;

    const plans = await Plan.find(query).skip(offset).limit(10);
    const count = await Plan.count(query);
    return { plans, count };
}

const loadPlan = async (planId) => {   
    return await Plan.findById({ _id: planId });
}

const updateAdminCheck = async (planId, identityConfirmation, groupingConfirmation, documentsConfirmation) => {
    const plan = await Plan.findOneAndUpdate(
        { _id: planId },
        {
            identityConfirmation: identityConfirmation,
            groupingConfirmation: groupingConfirmation,
            documentsConfirmation: documentsConfirmation
        }, { new: true });
    return plan
}

const updatePlan = async (planId, inputFields) => {    
    const updatedPlan = Plan.findOneAndUpdate({ _id: planId }, inputFields, { new: true });
    return updatedPlan;
}


const getPlansByStatus = async (iStatus) => {
    const plans = await Plan.find({ status: iStatus.message });
    return plans;
};
const setStatus = async (planId, status, sendBack) => {
    if (sendBack) {
        return await Plan.findOneAndUpdate({ _id: planId }, { status: status.message }, { new: true });
    }
    else {
        await Plan.findOneAndUpdate({ _id: planId }, { status: status.message });
    }
};


const checkPlanExists = async (planId) => {
   return await Plan.findById({ _id: planId });
}

const getCompanyEnvoy = async (companyEnvoy) => {
    // const {gmail, mobile} = await User.findOne({"nameTag": companyName});
    return ["foo@gmail.com", "123456789"]
}


module.exports = {
    createPlan, getLastPlanIndex, deletePlan,
    loadPlan, loadPlansPagination, loadPlans, updatePlan, getPlansByStatus, setStatus, checkPlanExists, updateAdminCheck,
     getCompanyEnvoy
}