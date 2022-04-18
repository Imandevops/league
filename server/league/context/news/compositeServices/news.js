const { createError } = require("../../../../utility/error/errorHandling");
const { GlobalExceptions } = require("../../../../utility/error/exceptions");
const { createContextFolder, createContextFiles, deleteFolder, loadContextFolder, renameFolder, getFileType} = require("../../../../utility/files");
const { deleteNews, updateNews, loadNews, craeteNews, getNewsById } = require("../atomicServices/news");



const wsCreateNews = async (newsTitle, newsText, newsDate, files) => {
    const news = await craeteNews(newsTitle, newsText, newsDate);
    // const folderName = newsTitle.split(' ').join('');
    const folderName = `${newsTitle}`;
    try {
        await createContextFolder("context/news", folderName);
        await createContextFiles("context/news", folderName, files);
    }
    catch {
        await deleteNews(news._id);
        throw createError(GlobalExceptions.context.news.newsPicNotCreated);
    }

    return {
        newsId: news._id,
        newsTitle: news.newsTitle,
        newsText: news.newsText,
        newsDate: news.newsDate,
    }
}

const wsUpdateNews = async (newsId, newsTitle, newsText, newsDate, pics) => {
    try{
        const oldNews = await getNewsById(newsId);
        let folderName = `${oldNews.newsTitle}`;
        
        if(pics) {
            console.log("title changed!")
            await deleteFolder("context/news", folderName);
            await createContextFolder("context/news", newsTitle);
            await createContextFiles("context/news", newsTitle, pics);
        }
        else{
            if(newsTitle && newsTitle != oldNews.newsTitle){
                renameFolder("context/news", folderName, newsTitle);
            }
        }
    }
    catch(e){
        console.log(e);
        throw createError(GlobalExceptions.context.news.newsPicNotCreated);
    }
    await updateNews(newsId, newsTitle, newsText, newsDate);
    return;
}

const wsLoadNews = async () => {
    const news = await loadNews();
    return news.map( (n) => {
        const folderName = `${n.newsTitle}`;
        const { fileNames, fileBuffers } =  loadContextFolder("context/news", folderName);
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
            newsId: n._id,
            newsTitle: n.newsTitle,
            newsText: n.newsText,
            newsDate: n.newsDate,
            image: images
        }
    })
}

const wsLoadNewsById = async (newsId) => {
    const news = await getNewsById(newsId);
    if (!news) {
        throw createError(GlobalExceptions.context.news.NewsNotFound)
    }
    const folderName = `${news.newsTitle}`;
    const { fileNames, fileBuffers } = loadContextFolder("context/news", folderName);
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
        newsId: news._id,
        newsTitle: news.newsTitle,
        newsText: news.newsText,
        newsDate: news.newsDate,
        images: images
        
    }
}

const wsDeleteNews = async (newsId) => {

    const news = await getNewsById(newsId)
    if (!news) {
        throw createError(GlobalExceptions.context.news.NewsNotFound)
    }
    try {
        await deleteFolder("context/news", news.newsTitle);
    }
    catch (e) {
        throw createError(GlobalExceptions.context.news.newsPicNotCreated);
    }
    await deleteNews(newsId);
}


const wsLoadNewsSlider = async () => {
    const news = await loadNews();
    return news.map( (n) => {
        const folderName = `${n.newsTitle}`;
        const { fileNames, fileBuffers } =  loadContextFolder("context/news", folderName);
        let image = {};
        for(var i=0; i<fileNames.length; i++) {
            const fName = fileNames[i].split(".")[0];
            if(fName === "first")
               { image = 
                    {
                        fileName: fileNames[i],
                        type: getFileType(fileNames[i].split(".").pop()),
                        data: fileBuffers[i]
                    };
                    break;
                }
        }
        return {
            newsId: n._id,
            newsTitle: n.newsTitle,
            newsText: n.newsText,
            newsDate: n.newsDate,
            image: image
        }
    })
}


module.exports = { wsCreateNews, wsUpdateNews, wsLoadNews, wsLoadNewsById, wsDeleteNews, wsLoadNewsSlider }