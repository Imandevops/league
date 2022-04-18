const mongoose = require('mongoose');

newsSchema = new mongoose.Schema({
    newsTitle: {
        type: String,
        required: true
    },
    newsText: {
        type: String,
        required: true
    },
    newsDate: {
        type: Date,
    }
});

News = mongoose.model('news', newsSchema);
exports.News = News;