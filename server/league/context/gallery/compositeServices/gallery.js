const { GlobalExceptions } = require("../../../../utility/error/exceptions");
const { createError } = require("../../../../utility/error/errorHandling");
const { craeteGallery, deleteGallery, loadGallery, updateGallery, getGalleryById, countGallery, getLastRound } = require("../atomicServices/gallery");
const { deleteFolder, createContextFolder, createContextFiles, loadContextFolder, getFileType, renameFolder } = require('../../../../utility/files');

const wsCreateGallery = async  (context, round, pics) => {
    const index = await countGallery();
    const gallery = await craeteGallery(context, round, index+1);
    try{
        const folderName = index+1;
        await createContextFolder("context/gallery", folderName);
        await createContextFiles("context/gallery", folderName, pics);
    }
    catch(e){
        console.log(e);
        await deleteGallery(gallery._id);
        throw createError(GlobalExceptions.context.gallery.galleryNotCreated);
    }
    return {
        id: gallery._id,
        context: gallery.context,
        round: gallery.round,
        index: gallery.index,
    }
}

const wsLoadGallery = async() => {
    const gallery = await loadGallery();
    const lastRound = getLastRound(gallery);
    return  gallery.map((g) => {
            const folderName = `${g.index}`;
            const { fileNames, fileBuffers } = loadContextFolder("context/gallery", folderName);
            const fileType = getFileType(fileNames[0].split('.').pop());
            return {
                id: g._id,
                context: g.context,
                round: g.round,
                index: g.index,
                image: {fileName: fileNames[0],
                    type: fileType,
                     data: fileBuffers[0]}
                };
            })}

const wsUpdateGallery = async (galleryId, context, round, pics) => {
    try{
        const oldInfo = await getGalleryById(galleryId);
        let folderName = `${oldInfo.index}`;
        if(pics) {
            console.log('kkkkkkkkkkk',folderName);
            deleteFolder("context/gallery", folderName);
            await createContextFolder("context/gallery", folderName);
            await createContextFiles("context/gallery", folderName, pics);
        }
    }
    catch(e){
        console.log(e);
        throw createError(GlobalExceptions.context.gallery.galleryNotCreated);
    }
    const gallery = await updateGallery(galleryId, context, round);
    return gallery;
}

const wsDeleteGallery = async(galleryId) => {
 const gallery = await getGalleryById(galleryId);
 deleteFolder("context/gallery", gallery.index);
 return await deleteGallery(galleryId);
}  


module.exports = {wsCreateGallery, wsLoadGallery, wsUpdateGallery, wsDeleteGallery} 

