const { number, object, string } = require('joi');
const Joi = require('joi');
const { map } = require('lodash');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');


PlanExpertInfoSchema = new mongoose.Schema({
  
    planUniqueName: {
        type: String,
        required: true
    },
    planName: {
        type: String,
        required: true
    },
  
    nameAndFamily: {
        type: String,
        required: true
    },
    specializedLevel: {
        type: String,
        required: true
    },
    serviceLocation: {
        type: String,
        required: true
    }
   
});

PlanExpertInfo = mongoose.model('PlanExpertInfos', PlanExpertInfoSchema);
exports.PlanExpertInfo = PlanExpertInfo;