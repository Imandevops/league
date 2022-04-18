
const { GlobalExceptions } = require("../../../utility/error/exceptions");
const { createError } = require("../../../utility/error/errorHandling");
const { createSelectedProfiles,loadSelectedProfiles,getSelectedProfilesById,updateSelectedProfile,getSelectedProfile, deleteSelectedProfile, loadSelectedProfilesSearch  } = require("../atomicServices/selectedProfiles");
const { getSecurityKeys } = require('../infra/getKeys');
const { deleteFolder, createContextFolder, createContextFiles, loadContextFolder, getFileType, renameFolder,deleteContextFile } = require('../../../utility/files');

const wsCreateSelectedProfiles = async (
    name,family, lastEducationalCertificate,companyName,
    organizationLevel, startDate, summeryExecutiveRecords
    , 
    designsProvidedList
    , files) => {
     
    let SelectedProfiles;

      
    try {
        
        SelectedProfiles = await createSelectedProfiles(name,family, lastEducationalCertificate,companyName,
            organizationLevel, startDate, summeryExecutiveRecords
            , 
            designsProvidedList
            );
            const folderName = name  + '_' + '('+ SelectedProfiles._id.toString()+')';

            
            try{
               
                await createContextFolder("context/selectedProfiles", folderName);
                
                await createContextFiles("context/selectedProfiles", folderName, files);
            }
            catch(e){
                await deleteWinner(selectedProfiles._id);
                throw createError(GlobalExceptions.context.selectedProfiles.selectedProfilesNotCreated);
            }
    }
    catch(e) {
      //  throw createError(GlobalExceptions.plan.planNotCreated);
    }
     
 
    return {
        SelectedProfilesId: SelectedProfiles._id
    };
}

const wsLoadSelectedProfiles = async() => {
    const selectedProfiles = await loadSelectedProfiles();
    return  selectedProfiles.map((w) => {
        
        const folderName = `${w.name}` + '_' + '('+ `${w.id.toString()}` +')';

              
        
        const { fileNames, fileBuffers } = loadContextFolder("context/selectedProfiles", folderName);
       
        let companyName;
        switch (w.companyName) {
            case "BSM":
                companyName = "بهسازان ملت";
                break;
            case "BPM":
                companyName = "به پرداخت ملت";
                break;
            case "SYS":
                companyName = "مهندسی سیستم یاس";
                break;
            case "YaasSie":
                companyName = "مهندسی سیستم یاس ارغوانی";
                break;
            case "SITS":
                companyName = "زیرساخت امن خدمات تراکنشی";
                break;
            case "SHGH":
                companyName = "مهندسی نرم افزار شقایق";
                break;
            default:
                companyName = "نامشخص";
        }
        
        let natureName;
        switch (w.designsProvidedList[0].nature) {
            case "idea":
                natureName = "ایده";
                break;
            case "study":
                natureName = "مطالعه و پژوهش";
                break;
            case "primary product":
                natureName = "محصول اولیه";
                break;
            case "final product":
                natureName = "محصول نهایی";
                break;
    
            default:
                natureName = "0";
        }

     
      
       var fileType='';
       for(let i=0 ; i< fileNames.length ; i++)
       {
           
           if(fileNames[i].split(".")[0] === "userImage")
           {
                fileType = getFileType(fileNames[i].split(".").pop());

                return {
                    id: w._id,
                    name: w.name,
                    family: w.family,
                    lastEducationalCertificate: w.lastEducationalCertificate,
                    companyName: companyName,
                    organizationLevel: w.organizationLevel,
                    startDate: w.startDate,
                    summeryExecutiveRecords: w.summeryExecutiveRecords,
                    designsProvidedList: w.designsProvidedList,           
                    natureName: natureName,           
                    image: {fileName: fileNames[i],
                        type: fileType,
                         data: fileBuffers[i]}
                }
           }
            
       }
       
      
        
    })
}

const wsLoadSelectedProfilesSearch = async(courseTitle,nature) => {
    const selectedProfiles = await loadSelectedProfilesSearch(courseTitle,nature);
   
    

    return  selectedProfiles.map((w) => {
        
        const folderName = `${w.name}` + '_' + '('+ `${w.id.toString()}` +')';
       
        
        const { fileNames, fileBuffers } = loadContextFolder("context/selectedProfiles", folderName);
        
        let companyName;
        switch (w.companyName) {
            case "BSM":
                companyName = "بهسازان ملت";
                break;
            case "BPM":
                companyName = "به پرداخت ملت";
                break;
            case "SYS":
                companyName = "مهندسی سیستم یاس";
                break;
            case "YaasSie":
                companyName = "مهندسی سیستم یاس ارغوانی";
                break;
            case "SITS":
                companyName = "زیرساخت امن خدمات تراکنشی";
                break;
            case "SHGH":
                companyName = "مهندسی نرم افزار شقایق";
                break;
            default:
                companyName = "نامشخص";
        }
        
        // switch (w.designsProvidedList[0].nature) {
        //     case "idea":
        //         natureName = "ایده";
        //         break;
        //     case "study":
        //         natureName = "مطالعه و پژوهش";
        //         break;
        //     case "primary product":
        //         natureName = "محصول اولیه";
        //         break;
        //     case "final product":
        //         natureName = "محصول نهایی";
        //         break;
    
        //     default:
        //         natureName = "0";
        // }

     
     
        var fileType='';
        for(let i=0 ; i< fileNames.length ; i++)
        {
            
            if(fileNames[i].split(".")[0] === "userImage")
            {
                 fileType = getFileType(fileNames[i].split(".").pop());
 
                 return {
                     id: w._id,
                     name: w.name,
                     family: w.family,
                     lastEducationalCertificate: w.lastEducationalCertificate,
                     companyName: companyName,
                     organizationLevel: w.organizationLevel,
                     startDate: w.startDate,
                     summeryExecutiveRecords: w.summeryExecutiveRecords,
                     designsProvidedList: w.designsProvidedList,           
                     // natureName: natureName,           
                     image: {fileName: fileNames[i],
                         type: fileType,
                          data: fileBuffers[i]}
                 }
            }
             
        }
        
    })
}

const wsLoadSelectedProfilesById = async (Id) => {
    const SelectedProfiles = await getSelectedProfilesById(Id);

   
    // if (!SelectedProfiles) {
    //     throw createError(GlobalExceptions.context.news.NewsNotFound)
    // }

   
    const folderName = `${SelectedProfiles.name}` + '_' + '('+ `${Id.toString()}` +')';
   
    const { fileNames, fileBuffers } = loadContextFolder("context/selectedProfiles", folderName);
    
    let images = [];
    for(var i=0; i<fileNames.length; i++) {
        images.push(
            {
                fileName: fileNames[i],
                type: getFileType(fileNames[i].split(".").pop()),
                data: fileBuffers[i]
            }
        )
    }
   
    return {
            id: SelectedProfiles._id,
            name: SelectedProfiles.name,
            family: SelectedProfiles.family,
            lastEducationalCertificate: SelectedProfiles.lastEducationalCertificate,
            companyName: SelectedProfiles.companyName,
            organizationLevel: SelectedProfiles.organizationLevel,
            startDate: SelectedProfiles.startDate,
            summeryExecutiveRecords: SelectedProfiles.summeryExecutiveRecords,
            designsProvidedList: SelectedProfiles.designsProvidedList,          
            images: images
        
    }
}



const wsUpdateSelectedProfiles = async (Id, name,family, lastEducationalCertificate,companyName,
    organizationLevel, startDate, summeryExecutiveRecords, designsProvidedList, files) => {
        try{
            const oldSelectedProfile = await getSelectedProfile(Id);
               

            const folderName = `${oldSelectedProfile.name}`+ '_' + '('+ `${Id.toString()}` +')';
          
            if(files.length != 0){
                if(name ) {
                   
                    
                  deleteContextFile("context/selectedProfiles", folderName, files);
                    setTimeout(() => {
                        createContextFiles("context/selectedProfiles", folderName, files);
                }, 100);
                 
                 
                }
            }
            else{
                
                if(name !=null ){                  
                    const newFolder = `${name}`+ '_' + '('+ `${Id.toString()}` +')';
                    renameFolder("context/selectedProfiles", folderName, newFolder);
                }
            }
        }
        catch(e){
            console.log(e);
            throw createError(GlobalExceptions.context.selectedProfiles.selectedProfilesNotCreated);
        }
        const selectedProfiles = await updateSelectedProfile(Id, name,family,lastEducationalCertificate,companyName,
            organizationLevel, startDate, summeryExecutiveRecords, designsProvidedList);
        return selectedProfiles;
    }

    const wsDeleteSelectedProfile = async(Id) => {
        const SelectedProfile = await getSelectedProfile(Id);
        const folderName = `${SelectedProfile.name}`+ '_' + '('+ `${Id.toString()}` +')';
       
        deleteFolder("context/selectedProfiles", folderName);
        return await deleteSelectedProfile(Id);
       }  

module.exports = { wsCreateSelectedProfiles, wsLoadSelectedProfiles, wsLoadSelectedProfilesById, wsUpdateSelectedProfiles,wsDeleteSelectedProfile,wsLoadSelectedProfilesSearch};