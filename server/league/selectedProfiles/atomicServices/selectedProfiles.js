const { dbErrorHandling } = require('../../../utility/error/dbError');
const { SelectedProfiles } = require('../model/selectedProfiles');
const selectedProfiles = require('../router/router');


const createSelectedProfiles = async (name,family, lastEducationalCertificate,companyName,
    organizationLevel, startDate, summeryExecutiveRecords
    , 
    designsProvidedList
    ) => {
        
    try {
       
     
        let selectedProfiles = new SelectedProfiles({
            name: name,
            family:family,
            lastEducationalCertificate: lastEducationalCertificate,
            companyName : companyName,
            organizationLevel: organizationLevel,
            startDate: startDate,
            summeryExecutiveRecords: summeryExecutiveRecords
            ,
            designsProvidedList: designsProvidedList
        });
        
        selectedProfiles = await selectedProfiles.save();
       
        return selectedProfiles;

    }

    catch (error) {
       
        await dbErrorHandling(error);
    }
}

const loadSelectedProfiles = async () => {    
   
    const selectedProfiles = await SelectedProfiles.find({});  
    return selectedProfiles
}

const getSelectedProfilesById = async (Id) => {
    return await SelectedProfiles.findById({ _id: Id })
}

const loadSelectedProfilesSearch = async (courseTitle,nature) => {
    
    const query = {};
    if (courseTitle) query.courseTitle = courseTitle;
    if (nature != 0) query.nature = nature;

      
    return await SelectedProfiles.find( { designsProvidedList : { $elemMatch :  query  } });
}

const getSelectedProfile = async (Id) => {
    const selectedProfile = await SelectedProfiles.findOne({_id: Id});
    return selectedProfile
}

const updateSelectedProfile = async (Id, name,family,lastEducationalCertificate,companyName,
    organizationLevel, startDate, summeryExecutiveRecords, designsProvidedList) => {
    const query = {};
    if(name) query.name = name;
    if(family) query.family = family;
    if(companyName) query.companyName = companyName;
    if(lastEducationalCertificate) query.lastEducationalCertificate = lastEducationalCertificate;
    if(organizationLevel) query.organizationLevel = organizationLevel;
    if(startDate) query.startDate = startDate;
    if(summeryExecutiveRecords) query.summeryExecutiveRecords = summeryExecutiveRecords;
    if(designsProvidedList) query.designsProvidedList = designsProvidedList;
    const selectedProfiles = await SelectedProfiles.findOneAndUpdate({_id: Id}, query, {new: true});
    return selectedProfiles
}

const deleteSelectedProfile = async (Id) => {
    try{        
        const SelectedProfile = await SelectedProfiles.findOneAndDelete({_id: Id});
        return SelectedProfile;
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}

module.exports = {
    createSelectedProfiles,loadSelectedProfiles,getSelectedProfilesById,getSelectedProfile,updateSelectedProfile,deleteSelectedProfile,loadSelectedProfilesSearch
}

