const {Key} = require('../../../config/model/key');

const getSecurityKeys = async () => {
    const securityKey = await Key.find({});
    return securityKey;
}

module.exports = { getSecurityKeys }