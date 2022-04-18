const { number, object, string, array } = require('joi');
const Joi = require('joi');
const { map } = require('lodash');
const mongoose = require('mongoose');


winnerSchema = new mongoose.Schema({
   leagueRound:{
       type: String,
       required: true
   },
   abb:{
       type: String,
       required: true
   },
   rank:{
    type: String,
    required: true
   },
   planEnvoy:{
    type: String,
    required: true
   },
   team: {},
   issuedDate:{
       type: Date,
       required: true
   }
});

Winner = mongoose.model('winners', winnerSchema);
exports.Winner = Winner;