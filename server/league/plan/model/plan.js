const { number, object, string } = require('joi');
const Joi = require('joi');
const { map } = require('lodash');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

//history of Date() for updats, admin revisions and expert revisions
//like rejected by admin at 2021-10-24
//status is only current state
planSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyNamePer:{
        type: String,
    },
    abb: {
        type: String,
        required: true
    },
    specializedField: {
        type: String,
        required: true
    },
    companyEnvoy: {
        type: String,
        required: true,
    },
    authors:
        [{
            name: String,
            phone: String,
            email: String,
            lastCertificate:String,
            cooperationType:String,
            attendanceHistory:String,
            servicePlaceUnit : String,
            specializedLevel:String
            

            // type: Object,
            // required: true
        }]
    ,
    planName: {
        type: String,
        required: true
    },
    field: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    leagueCourse: {
        type: String,
        required: true
    },
    leagueStage: {
        type: String,
        required: true
    },
    planNature: {
        type: String,
        required: true
    },
    innovation: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        require: true,
        default: `در انتظار تایید مدیر شرکت`
    },
    planIndex: {
        type: Number,
        require: true
    },
    undergraduateStatus :  {
        type: String,
        required: true,
        default : 'WExpert'
    },
    identityConfirmation: { type: Boolean, default: null },
    groupingConfirmation: { type: Boolean, default: null },
    documentsConfirmation: { type: Boolean, default: null },
    issuedDate: {
        type: Date,
    },
});

Plan = mongoose.model('Plans', planSchema);
exports.Plan = Plan;