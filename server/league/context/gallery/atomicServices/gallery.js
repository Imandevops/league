const { dbErrorHandling } = require('../../../../utility/error/dbError');
const { Gallery } = require('../model/gallery');

const craeteGallery = async (context, round, index) => {
    try{
        let gallery = new Gallery({
            context: context,
            round: round,
            index: index,
        });
        gallery = await gallery.save();
        return gallery;
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}


const deleteGallery = async (galleryId) => {
    try{
        const gallery = await Gallery.findOneAndDelete({_id: galleryId});
        return gallery;
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}

const loadGallery = async () => {
    try{
        const gallery = await Gallery.find({});
        return gallery;
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}

const updateGallery = async (galleryId, context, round) => {
    try{
        const query = {};
        if(context) query.context = context;
        if(round) query.round = round;
        const gallery = await Gallery.findOneAndUpdate({_id: galleryId}, query, {new: true});
        return gallery;
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}

const getGalleryById = async (galleryId) => {
    try{
        const gallery = await Gallery.findOne({_id: galleryId});
        return gallery;
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}

const countGallery = async () => {
    const gallery = await Gallery.find({});
    if(gallery) return gallery.length
    return 0;
}

const getLastRound = async (gallery) => {
    
}

module.exports = { craeteGallery, deleteGallery, loadGallery, updateGallery, getGalleryById, countGallery, getLastRound }