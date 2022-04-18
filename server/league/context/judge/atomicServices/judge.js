const { dbErrorHandling } = require('../../../../utility/error/dbError');
const { Judge } = require('../model/judge');

const craeteJudge = async (name, position) => {
    try{
        let judge = new Judge({
            name: name,
            position: position,
        })
        judge = await judge.save();
        return judge
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}


const deleteJudge = async (judgeId) => {
    try{
        const judge = await Judge.findOneAndDelete({_id: judgeId});
        return judge
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}

const loadJudges = async () => {
    try{
        const judges = await Judge.find({});
        return judges
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}

const updateJudge = async (winnerId, name, position) => {
    try{
        const query = {};
        if(name) query.name = name;
        if(position) query.position = position;
        const judge = await Judge.findOneAndUpdate({_id: winnerId}, query, {new: true});
        return judge
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}

const getJudge = async (judgeId) => {
    try{
        const judge = await Judge.findOne({_id: judgeId});
        return judge
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}



module.exports = {craeteJudge, deleteJudge, loadJudges, updateJudge, getJudge}