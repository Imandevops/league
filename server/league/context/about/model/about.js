const mongoose = require('mongoose');


aboutSchema = new mongoose.Schema({
   aboutText:{
       type: String,
       required: true
   },
   issuedDate:{
       type: Date,
    //    required: true
   },
   round: {
       type: String,
       required: true
   }
});

About = mongoose.model('abouts', aboutSchema);
exports.About = About;