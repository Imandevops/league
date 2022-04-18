const { GlobalExceptions } = require("../../../utility/error/exceptions");
const { createError } = require("../../../utility/error/errorHandling");
const { createPlanUndergraduate,loadPlanUndergraduateOnUniqueName,updatePlanUndergraduate} = require("../atomicServices/planUndergraduate");

const { statuses } = require("../../../utility/statuses");
const { number } = require("joi");




const wsCreatePlanUndergraduate = async (
    planUniqueName, planName, innovativeAspects,innovativeAspectsScore, newTopic,newTopicScore, scientificValue,scientificValueScore,
            explainable,explainableScore,scalability,scalabilityScore,finalScore,finalOpinion) => {
 

 
    try {
        
        planUndergraduate = await createPlanUndergraduate(planUniqueName, planName, innovativeAspects,innovativeAspectsScore, newTopic,newTopicScore,
                             scientificValue,scientificValueScore,
                                explainable,explainableScore,scalability,scalabilityScore,finalScore,finalOpinion);

                               
    }
    catch(e) {
        
        throw createError(GlobalExceptions.plan.planNotCreated);
    }

  
    return {
        planUndergraduateId: planUndergraduate._id
    };
}

const wsUpdatePlanUndergraduate = async (planUndergraduateId,planUniqueName,planName,
    innovativeAspects,innovativeAspectsScore, newTopic,newTopicScore, scientificValue,scientificValueScore,
            explainable,explainableScore,scalability,scalabilityScore,finalScore,finalOpinion) => {
       
        const planExpertInfo = await updatePlanUndergraduate(planUndergraduateId,planUniqueName,planName,
            innovativeAspects,innovativeAspectsScore, newTopic,newTopicScore, scientificValue,scientificValueScore,
                    explainable,explainableScore,scalability,scalabilityScore,finalScore,finalOpinion);

        return planExpertInfo;
    }



const wsLoadPlanUndergraduate = async (planUniqueName) => {


        const planUndergraduate = await loadPlanUndergraduateOnUniqueName(planUniqueName);    
       
        
        return [{
           
            id : planUndergraduate.id,
            planName: planUndergraduate.planName,        
            planUniqueName: planUndergraduate.planUniqueName,
            innovativeAspects: planUndergraduate.innovativeAspects,
            innovativeAspectsScore: planUndergraduate.innovativeAspectsScore,
            newTopic: planUndergraduate.newTopic,
            newTopicScore: planUndergraduate.newTopicScore,
            scientificValue: planUndergraduate.scientificValue,
            scientificValueScore: planUndergraduate.scientificValueScore,
            explainable: planUndergraduate.explainable,
            explainableScore: planUndergraduate.explainableScore,
            scalability: planUndergraduate.scalability,
            scalabilityScore: planUndergraduate.scalabilityScore,
            finalScore: planUndergraduate.finalScore,
            finalOpinion: planUndergraduate.finalOpinion,
        }]
        
    }
    





module.exports = { wsCreatePlanUndergraduate,wsLoadPlanUndergraduate,wsUpdatePlanUndergraduate };

