const mongoose = require("mongoose");
const { initializeAdmin, initializeFolder } = require("./initialize");
const {logger} = require("../utility/logging");
const initializedb = async () => {
    mongoose.connect("mongodb://localhost:27017/leagueDemo", { useNewUrlParser: true, useUnifiedTopology: true, maxPoolSize: 5 })
        .then(async () => {
            console.log('Connected to MongoDB :)');
            logger.info(`[CONNECTED TO DB: ${'mongodb://localhost:27017/leagueDemo'}]`);
            await initializeAdmin();
            await initializeFolder();
        })
        .catch(err => {
            console.error('Could not connect to MongoDB :(', err);
            logger.error('Could not connect to MongoDB :(');
            logger.error(err);
        });
};
module.exports = { initializedb }
