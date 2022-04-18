const mongoose = require('mongoose');

//encryption collection
registerSchema =  new mongoose.Schema({
    initVector: {
        type: String,
        required: true
    },    
    securityKey: {
        type: String,
        required: true
    },
    jwtPrivate: {
        type: String,
        // required: true
    }    
});

Key = mongoose.model('keys', registerSchema);
module.exports = {Key};
