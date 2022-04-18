const { dbErrorHandling } = require('../../../../utility/error/dbError');
const { About } = require('../model/about');


const craeteAbout = async (aboutText, round) => {
    try {
        let about = new About({
            aboutText: aboutText,
            round: round,
            issuedDate: new Date().getTime()
        });
        return await about.save();
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}

const loadAbout = async (round=null) => {
    try {
        if(round) {
            return await About.findOne({round: round});
        }
        else{
            return await About.find();
        }
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}

const updateAbout = async (oldRound, aboutText, round) => {
    const query = {};
    if(aboutText) query.aboutText = aboutText;
    if(round) query.round = round;
    try {
        await About.findOneAndUpdate({ round: oldRound }, query);
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}

const getAboutById = async (aboutId) => {
    try {
        return await About.findById({ _id: aboutId })
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}


const getAboutByRound = async (round) => {
    try {
        return await About.findOne({ round: round })
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}


const deleteAbout = async (round) => {
    try{
        await About.findOneAndDelete({round: round});
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}


const countAbout = async () => {
    const gallery = await About.find({});
    if(gallery) return gallery.length
    return 0;
}




module.exports = { craeteAbout, loadAbout, updateAbout, getAboutById, getAboutByRound, deleteAbout, countAbout}