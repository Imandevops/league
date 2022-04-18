const { text } = require('express');
const { number, object, string, boolean } = require('joi');
const Joi = require('joi');
const { map } = require('lodash');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');


planUndergraduateSchema = new mongoose.Schema({
  
    planUniqueName: {
        type: String,
        required: true
    },
    planName: {
        type: String,
        required: true
    },
  
    innovativeAspects: {
        type: String 
    },
    innovativeAspectsScore: {
        type: Number, 
        required: true
    },
    newTopic: {
        type: String
    },
    newTopicScore: {
        type: Number,
        required: true
    },
    scientificValue: {
        type: String
    },
    scientificValueScore: {
        type: Number,
        required: true
    },
    explainable: {
        type: String
    },
    explainableScore: {
        type: Number,
        required: true
    },
    scalability: {
        type: String
    },
    scalabilityScore: {
        type: Number,
        required: true
    },    
    finalScore: {
        type: Number,
        required: true
    },
    finalOpinion: {
        type: String,
        required: true
    }
   
});

PlanUndergraduate = mongoose.model('planUndergraduates', planUndergraduateSchema);
module.exports = { PlanUndergraduate };