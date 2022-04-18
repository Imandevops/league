const { GlobalExceptions } = require("../../../../utility/error/exceptions");
const { createError } = require("../../../../utility/error/errorHandling");
const { craeteInfo, deleteInfo, loadInfo, updateInfo, getInfo, countInfo } = require("../atomicServices/info");
const { deleteFolder, createContextFolder, createContextFiles, loadContextFolder, getFileType, renameFolder } = require('../../../../utility/files');

const wsCreateInfo = async  (context, pics) => {
    const index = await countInfo();
    const info = await craeteInfo(context, index+1);
    try{
        const folderName = index+1;
        await createContextFolder("context/info", folderName);
        await createContextFiles("context/info", folderName, pics);
    }
    catch(e){
        console.log(e);
        await deleteInfo(info._id);
        throw createError(GlobalExceptions.context.info.infoNotCreated);
    }
    return {
        id: info._id,
        context: info.context,
        index: info.index,
    }
}

const wsLoadInfo = async(infoId=null) => {
    if(infoId){
        const info = await loadInfo(infoId);
        const folderName = `${info.index}`;
        const { fileNames, fileBuffers } = loadContextFolder("context/info", folderName);
        const fileType = getFileType(fileNames[0].split('.').pop());
        return {
            id: info._id,
            context: info.context,
            index: info.index,
            image: {fileName: fileNames[0],
                type: fileType,
                 data: fileBuffers[0]}
        };
    }
    else{
        const info = await loadInfo();
        return  info.map((i) => {
            const folderName = `${i.index}`;
            const { fileNames, fileBuffers } = loadContextFolder("context/info", folderName);
            const fileType = getFileType(fileNames[0].split('.').pop());
            return {
                id: i._id,
                context: i.context,
                index: i.index,
                image: {fileName: fileNames[0],
                    type: fileType,
                     data: fileBuffers[0]}
            };
        });
    }
}

const wsUpdateInfo = async (infoId, context, pics) => {
    try{
        const oldInfo = await getInfo(infoId);
        let folderName = `${oldInfo.index}`;
        if(pics) {
            deleteFolder("context/info", folderName);
            await createContextFolder("context/info", folderName);
            await createContextFiles("context/info", folderName, pics);
        }
    }
    catch(e){
        console.log(e);
        throw createError(GlobalExceptions.context.info.infoNotCreated);
    }
    const info = await updateInfo(infoId, context);
    return info;
}

const wsDeleteInfo = async(infoId) => {
 const info = await getInfo(infoId);
 deleteFolder("context/info", info.index);
 return await deleteInfo(infoId);
}  


module.exports = {wsCreateInfo, wsLoadInfo, wsUpdateInfo, wsDeleteInfo}    

