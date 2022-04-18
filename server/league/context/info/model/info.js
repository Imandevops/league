const mongoose = require('mongoose');


infoSchema = new mongoose.Schema({
   context:{
       type: String,
       required: true
   },
   index:{
       type: Number,
       required: true
   },
});

Info = mongoose.model('info', infoSchema);
exports.Info = Info;