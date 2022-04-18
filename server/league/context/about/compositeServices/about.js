const { GlobalExceptions } = require("../../../../utility/error/exceptions");
const { createError } = require("../../../../utility/error/errorHandling");
const { craeteAbout, loadAbout, updateAbout, getAboutById, getAboutByRound, deleteAbout, countAbout } = require("../atomicServices/about");
const { deleteFolder, createContextFolder, createContextFiles, loadContextFolder, getFileType, getFolders, folderExists } = require('../../../../utility/files');


const wsCreateAbout = async (aboutText) => {
    const round = await countAbout();
    const about = await craeteAbout(aboutText, round+1);
    return {
        aboutId: about._id,
        round: about.round,
        aboutText: about.aboutText,
        issuedDate: about.issuedDate
    }
}

const wsLoadAbout = async (round) => {
    if(round) {
        const about = await loadAbout(round);
        return {
            round: about.round,
            aboutText: about.aboutText,
            aboutText: about.aboutText,
            issuedDate: about.issuedDate
        }
    }
    else{
        const about = await loadAbout();
        const result = about.map(a => {
            return {
                round: a.round,
                aboutText: a.aboutText,
                issuedDate: a.issuedDate
            }
        });
        return result;
    }
}


const wsUpdateAbout = async (oldRound, aboutText, round) => {
    if (!await getAboutByRound(oldRound)){
        throw createError(GlobalExceptions.context.about.aboutNotFound);
    }

        return await updateAbout(oldRound, aboutText, round);
}


const wsDeleteAbout = async(round) => {
    if (!await getAboutByRound(round)){
        throw createError(GlobalExceptions.context.about.aboutNotFound);
    }
    await deleteAbout(round);
}  


const wsCreateAboutPic = async (pics) => {
    try {
        const round = getFolders("context/about").length;
       
        await createContextFolder("context/about", round+1);
        await createContextFiles("context/about", round+1, pics);
        return {
            round: round+1
        };
    }
    catch (e) {
        throw createError(GlobalExceptions.context.about.aboutPicNotCreated);
    }
}

const wsLoadAboutPic = async (round) => {
    if(folderExists('context/about', round))
    {const { fileNames, fileBuffers } =  loadContextFolder("context/about", round);
    const fileType = getFileType(fileNames[0].split('.').pop());

    return {
        image: 
            {fileName: fileNames[0],
            type: fileType,
            data: fileBuffers[0]}
    }}
    return "NO PICTURE POSTED YET!"
}

const wsLoadAllAboutPic = async () => {
    const folderNames = getFolders("context/about");
    let results = []
    for(var folderName of folderNames){
        const { fileNames, fileBuffers } =  loadContextFolder("context/about", folderName);
        const fileType = getFileType(fileNames[0].split('.').pop());
        results.push({
            image:{
                round: folderName,
                fileNames: fileNames[0],
                type: fileType,
                data: fileBuffers[0]
            }
        })
    }

    return results;
}


const wsUpdateAboutPic = async (pics, round) => {
    try {
        if(pics)
       { await deleteFolder("context/about", round);
        await createContextFolder("context/about", round);
        await createContextFiles("context/about", round, pics);}
    }
    catch (e) {
        console.log(e);
        throw createError(GlobalExceptions.context.about.aboutPicNotUpdate);
    }
    return;
}


const wsLoadLastAbout = async () => {
    const abouts = await loadAbout();
    if(abouts.length != 0){
        let temp = 0;
        let round =1;
        for( const about of abouts){
            if(about.issuedDate/1000 > temp){
                temp = about.issuedDate/1000;
                round = about.round;
            }
        }
        const image = await wsLoadAboutPic(round);
        const about = await getAboutByRound(round);
        return {
            image: image,
            round: about.round,
            aboutText: about.aboutText,
            issuedDate: about.issuedDate
        }
    }
    return abouts;  
}

const wsDeleteAboutPicture = async(round) => {
    
    // const about = await getAboutById(round);

    // console.log('kkkkkkkkkkkk',about.index);

    deleteFolder("context/about", round);
    return round;
   }  


module.exports = { wsCreateAbout, wsLoadAbout, wsUpdateAbout, wsCreateAboutPic, wsLoadAboutPic, wsUpdateAboutPic, wsDeleteAbout, wsLoadAllAboutPic, wsLoadLastAbout, wsDeleteAboutPicture}