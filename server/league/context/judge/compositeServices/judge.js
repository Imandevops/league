const { GlobalExceptions } = require("../../../../utility/error/exceptions");
const { createError } = require("../../../../utility/error/errorHandling");
const { craeteJudge, deleteJudge, loadJudges, updateJudge, getJudge } = require("../atomicServices/judge");
const { deleteFolder, createContextFolder, createContextFiles, loadContextFolder, getFileType, renameFolder } = require('../../../../utility/files');

const wsCreateJudge = async  (name, position, pics) => {
    const judge = await craeteJudge(name, position);
    try{
        const folderName = name;
        await createContextFolder("context/judge", folderName);
        await createContextFiles("context/judge", folderName, pics);
    }
    catch(e){
        await deleteJudge(judge._id);
        throw createError(GlobalExceptions.context.judge.judgeNotCreated);
    }
    return {
        id: judge._id,
        name: judge.name,
        position: judge.position,
    }
}

const wsLoadJudges = async() => {
    const judges = await loadJudges();
    console.log("this is judgessssssss", judges.length);
    return  judges.map((j) => {
        const folderName = `${j.name}`;
        const { fileNames, fileBuffers } = loadContextFolder("context/judge", folderName);
        const fileType = getFileType(fileNames[0].split('.').pop());
        return {
            id: j._id,
            name: j.name,
            position: j.position,
            image: {fileName: fileNames[0],
                type: fileType,
                 data: fileBuffers[0]}
        }
    })
}

const wsLoadJudge = async(judgeId) => {
    const judge = await getJudge(judgeId);
        const folderName = `${judge.name}`;
        const { fileNames, fileBuffers } = loadContextFolder("context/judge", folderName);
        const fileType = getFileType(fileNames[0].split('.').pop());
        return {
            id: judge._id,
            name: judge.name,
            position: judge.position,
            image: {fileName: fileNames[0],
                type: fileType,
                 data: fileBuffers[0]}
        }
}

const wsUpdateJudge = async (judgeId, name, position, pics) => {
    try{
        const oldJudge = await getJudge(judgeId);
        let folderName = `${oldJudge.name}`;
        if(pics) {
            deleteFolder("context/judge",folderName);
            await createContextFolder("context/judge", name);
            await createContextFiles("context/judge", name, pics);
        }
        else{
            if(name) {
                renameFolder("context/judge", folderName, name);
            };
        }
    }
    catch(e){
        throw createError(GlobalExceptions.context.judge.judgeNotCreated);
    }
    const judge = await updateJudge(judgeId, name, position);
    return judge;
}

const wsDeleteJudge = async(judgeId) => {
 const judge = await getJudge(judgeId);
 deleteFolder("context/judge", judge.name);
 return await deleteJudge(judgeId);
}  


module.exports = { wsCreateJudge, wsLoadJudges, wsUpdateJudge, wsDeleteJudge, wsLoadJudge }    

