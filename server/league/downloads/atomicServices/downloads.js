const { loadFileNames } = require("../../../utility/files")
const port = 3001;

const getDownloads = async (req) => {
    const fNames = await loadFileNames();
    const urls = [];
    for(const fName of fNames){
        const ref = req.headers.referer.split('//')[1].split('/')[0];
        // urls.push(`http://${ref}/downloads/${fName}`); //for stage and deployment server
        urls.push(`http://localhost:${port}/downloads/${fName}`); //for production server      
    }
    return urls;
}


module.exports = {getDownloads};
