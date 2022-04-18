const mongoose = require('mongoose');


judgeSchema = new mongoose.Schema({
   name:{
       type: String,
       required: true
   },
   position:{
       type: String,
       required: true
   },
});

Judge = mongoose.model('Judges', judgeSchema);
exports.Judge = Judge;