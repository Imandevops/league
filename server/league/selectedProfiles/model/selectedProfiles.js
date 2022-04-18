
const { number, object, string } = require('joi');
const mongoose = require('mongoose');


selectedProfilesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    family: {
        type: String,
        required: true
    },
    lastEducationalCertificate: {      
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    organizationLevel: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    summeryExecutiveRecords: {
        type: String,
        required: true
    }
    ,
    designsProvidedList:
        [{
            name: String,
            level: String,
            nature: String,
            courseTitle: String,
            stagePosition: Number,
            generalPosition: Number,
            innovatorsClubScore: Number
        }]
      
   
});

SelectedProfiles = mongoose.model('selectedProfiles', selectedProfilesSchema);
module.exports = { SelectedProfiles };
