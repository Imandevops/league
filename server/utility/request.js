

const giveBody = (req) => {
    if(req.body.body && typeof req.body.body == 'string') {
        const body = JSON.parse(req.body.body);
        return body;
    }
    else if (!req.body.body && typeof req.body == 'object') {
        return req.body;
    }
}



module.exports = { giveBody }