const mongoose = require('mongoose');


gallerySchema = new mongoose.Schema({
   context:{
       type: String,
       required: true
   },
   round:{
    type: String,
    required: true
},
   index:{
       type: Number,
       required: true
   },
});

Gallery = mongoose.model('gallery', gallerySchema);
exports.Gallery = Gallery;