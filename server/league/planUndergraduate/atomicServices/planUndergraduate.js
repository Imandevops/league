const { dbErrorHandling } = require('../../../utility/error/dbError');
const { PlanUndergraduate } = require('../model/PlanUndergraduate');


const createPlanUndergraduate = async (planUniqueName, planName, innovativeAspects,innovativeAspectsScore, newTopic,
    newTopicScore, scientificValue,scientificValueScore,
    explainable,explainableScore,scalability,scalabilityScore,finalScore,finalOpinion) => {

       
    try {
      
        let planUndergraduate = new PlanUndergraduate({
          
            planUniqueName: planUniqueName,
            planName: planName,
            innovativeAspects: innovativeAspects,
            innovativeAspectsScore: innovativeAspectsScore,
            newTopic : newTopic,
            newTopicScore : newTopicScore,
            scientificValue : scientificValue,
            scientificValueScore : scientificValueScore,
            explainable : explainable,
            explainableScore : explainableScore,
            scalability : scalability,
            scalabilityScore : scalabilityScore,
            finalScore : finalScore,
            finalOpinion : finalOpinion,
        });
        planUndergraduate = await planUndergraduate.save();

        
        return planUndergraduate;
    }

    catch (error) {
        await dbErrorHandling(error);
    }
}

const loadPlanUndergraduateOnUniqueName = async (planUniqueName) => {   

    
    return await PlanUndergraduate.findOne({ planUniqueName });
}

// const getPlanUndergraduate = async (planUndergraduateId) => {
//     const planUndergraduate = await PlanUndergraduate.findOne({_id: planUndergraduateId});
//     return planUndergraduate
// }

const updatePlanUndergraduate = async (planUndergraduateId,planUniqueName,planName,
    innovativeAspects,innovativeAspectsScore, newTopic,newTopicScore, scientificValue,scientificValueScore,
            explainable,explainableScore,scalability,scalabilityScore,finalScore,finalOpinion) => {

    
    const query = {};
    if(planUniqueName) query.planUniqueName = planUniqueName;
    if(planName) query.planName = planName;
    query.innovativeAspects = innovativeAspects;
    if(innovativeAspectsScore) query.innovativeAspectsScore = innovativeAspectsScore;
    query.newTopic = newTopic;
    if(newTopicScore) query.newTopicScore = newTopicScore;
    query.scientificValue = scientificValue;
    if(scientificValueScore) query.scientificValueScore = scientificValueScore;
    query.explainable = explainable;
    if(explainableScore) query.explainableScore = explainableScore;
    query.scalability = scalability;
    if(scalabilityScore) query.scalabilityScore = scalabilityScore;
    if(finalScore) query.finalScore = finalScore;
    if(finalOpinion) query.finalOpinion = finalOpinion;

    
    
    const planUndergraduate = await PlanUndergraduate.findOneAndUpdate({_id: planUndergraduateId}, query, {new: true});

    console.log('fffffffffffffffffffff',planUndergraduate);
    return planUndergraduate
}


module.exports = {
    createPlanUndergraduate,loadPlanUndergraduateOnUniqueName,updatePlanUndergraduate}