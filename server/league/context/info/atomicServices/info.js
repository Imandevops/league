const { dbErrorHandling } = require('../../../../utility/error/dbError');
const { Info } = require('../model/info');

const craeteInfo = async (context, index) => {
    try{
        let info = new Info({
            context: context,
            index: index,
        });
        info = await info.save();
        return info;
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}


const deleteInfo = async (infoId) => {
    try{
        const info = await Info.findOneAndDelete({_id: infoId});
        return info;
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}

const loadInfo = async (infoId=null) => {
    try{
        if(infoId){
            const info = await Info.findOne({_id: infoId});
            return info; 
        }
        else{
            const info = await Info.find();
            return info;
        };
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}

const updateInfo = async (infoId, context) => {
    try{
        const query = {};
        if(context) query.context = context;
        const info = await Info.findOneAndUpdate({_id: infoId}, query, {new: true});
        return info
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}

const getInfo = async (infoId) => {
    try{
        const info = await Info.findOne({_id: infoId});
        return info;
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}

const countInfo = async () => {
    const info = await Info.find({});
    if(info) return info.length
    return 0;
}

module.exports = {craeteInfo, deleteInfo, loadInfo, updateInfo, getInfo, countInfo }