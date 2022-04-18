const { dbErrorHandling } = require('../../../../utility/error/dbError');
const { News } = require('../model/news');

const craeteNews = async (newsTitle, newsText, newsDate) => {
    try {
        let news = new News({
            newsTitle,
            newsText,
            newsDate
        })
        return await news.save();
    }
    catch (error) {
        console.log(error);
        await dbErrorHandling(error);
    }
}

const updateNews = async (newsId, newsTitle, newsText, newsDate) => {
    try {
        await News.findOneAndUpdate({ _id: newsId }, { newsTitle, newsText, newsDate });
        return;
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}

const loadNews = async () => {
    try {
        return await News.find()
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}


const getNewsById = async (newsId) => {
    return await News.findById({ _id: newsId })
}

const deleteNews = async (newsId) => {
    return await News.findByIdAndRemove({ _id: newsId })
}




module.exports = { craeteNews, updateNews, loadNews, getNewsById, deleteNews }