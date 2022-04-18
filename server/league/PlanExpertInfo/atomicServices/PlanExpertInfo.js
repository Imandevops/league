const { dbErrorHandling } = require('../../../utility/error/dbError');
const { PlanExpertInfo } = require('../model/PlanExpertInfo');


const createPlanExpertInfo = async (planUniqueName,planName,
    nameAndFamily, specializedLevel, serviceLocation) => {
    try {
        console.log(planUniqueName,planName,
            nameAndFamily, specializedLevel, serviceLocation);
        let planExpertInfo = new PlanExpertInfo({
          
            planUniqueName: planUniqueName,
            planName: planName,
            nameAndFamily: nameAndFamily,
            specializedLevel: specializedLevel,
            serviceLocation : serviceLocation
        });
        planExpertInfo = await planExpertInfo.save();

        console.log('kkkkkkkkk',planExpertInfo);
        return planExpertInfo;
    }

    catch (error) {
        await dbErrorHandling(error);
    }
}

const loadPlanExpertInfoOnUniqueName = async (planUniqueName) => {   

    return await PlanExpertInfo.findOne({ planUniqueName });
}

const getPlanExpertInfo = async (planExpertInfoId) => {
    const planExpertInfo = await PlanExpertInfo.findOne({_id: planExpertInfoId});
    return planExpertInfo
}

const updatePlanExpertInfo = async (planExpertInfoId,  planUniqueName,planName,
    nameAndFamily, specializedLevel, serviceLocation) => {
    const query = {};
    if(planUniqueName) query.planUniqueName = planUniqueName;
    if(planName) query.planName = planName;
    if(nameAndFamily) query.nameAndFamily = nameAndFamily;
    if(specializedLevel) query.specializedLevel = specializedLevel;
    if(serviceLocation) query.serviceLocation = serviceLocation;
    
    const planExpertInfo = await PlanExpertInfo.findOneAndUpdate({_id: planExpertInfoId}, query, {new: true});

    console.log('ssssssssssss',planExpertInfo);
    return planExpertInfo
}


module.exports = {
    createPlanExpertInfo,getPlanExpertInfo,loadPlanExpertInfoOnUniqueName,updatePlanExpertInfo
}