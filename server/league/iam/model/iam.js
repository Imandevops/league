const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

//register model
registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    family: {
        type: String,
        required: true
    },
    sex: {
        //male true
        //woman false
        type: Boolean,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    graduation: {
        type: String,
        required: true
    },
    graduationField: {
        type: String,
        required: true
    },
    nationalId: {
        type: String,
        required: true,
        // unique:true
    },
    personnelId: {
        type: Number,
        required: true,
        // unique:true
    },
    companyName: {
        type: String,
        required: true
    },
    companyNamePer:{
        type: String,
    },
    organizationLevel: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
      // lowercase:true,
      
        // unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    authorities: {
        type: Array
    },
    type: {
        type: String,
        allowNull: false,
    },
    resetPass: {
        type: Boolean,
        default: false
        }
});

User = mongoose.model('Users', registerSchema);
module.exports = { User };
