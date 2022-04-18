const { GlobalExceptions } = require("../../../utility/error/exceptions");
const { createError } = require("../../../utility/error/errorHandling");
const { createPlanExpertInfo,updatePlanExpertInfo,loadPlanExpertInfoOnUniqueName} = require("../atomicServices/PlanExpertInfo");

const { statuses } = require("../../../utility/statuses");
const { PlanExpertInfo } = require("../model/PlanExpertInfo");




const wsCreatePlanExpertInfo = async (
    planUniqueName,planName,
            nameAndFamily, specializedLevel, serviceLocation) => {
 

 
    try {
        
        planExpertInfo = await createPlanExpertInfo(planUniqueName,planName,
            nameAndFamily, specializedLevel, serviceLocation);
    }
    catch(e) {
        throw createError(GlobalExceptions.plan.planNotCreated);
    }

  
    return {
        planExpertInfoId: planExpertInfo._id
    };
}

const wsUpdatePlanExpertInfo = async (planExpertInfoId,planUniqueName,planName,
    nameAndFamily, specializedLevel, serviceLocation) => {
       
        const planExpertInfo = await updatePlanExpertInfo(planExpertInfoId,  planUniqueName,planName,
            nameAndFamily, specializedLevel, serviceLocation);
        return planExpertInfo;
    }



const wsLoadPlanExpertInfo = async (planUniqueName) => {


        const planExpertInfo = await loadPlanExpertInfoOnUniqueName(planUniqueName);    
        
        
        return [{
           
            id : planExpertInfo.id,
            planName: planExpertInfo.planName,        
            planUniqueName: planExpertInfo.planUniqueName,
            nameAndFamily: planExpertInfo.nameAndFamily,
            specializedLevel: planExpertInfo.specializedLevel,
            serviceLocation: planExpertInfo.serviceLocation,
        }]
    }
    





module.exports = { wsCreatePlanExpertInfo,wsUpdatePlanExpertInfo,wsLoadPlanExpertInfo };

