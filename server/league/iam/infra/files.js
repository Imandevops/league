const fs = require('fs');
const { deleteFile } = require('../../../utility/files');

const craeteProfileImg = async (file, username) => {
    const fileName = file.originalname;
    const buffer = file.buffer;
    const filePath = __dirname + '/../../../../profiles/' + username + '.' + fileName.split('.').pop();
    fs.writeFile(filePath, buffer, (e) => {
        if (e) return console.error(e);
        console.log('saved at ', filePath);
    });
}


const getUserProfile = (username) => {
    const filePath = __dirname + '/../../../../profiles/';
    const profiles = fs.readdirSync(filePath);
    for(const profile of profiles){
        const fileName = profile.split('.')[0];
        if(fileName == username) {
            const buffer = fs.readFileSync(filePath + `${profile}`);
            return {profile, buffer}
        }
    }
    return "Profile Not Found";
}

const updateProfile = async (file, oldUserName, newUserName=null) => {
    const filePath = __dirname + '/../../../../profiles/';
    const profiles = fs.readdirSync(filePath);
    console.log("profiles", profiles);
    for(const profile of profiles){
        const fileName = profile.split('.')[0];
        console.log("fileName", fileName);
        console.log("username", oldUserName);
        console.log("file", file);

        if(fileName == oldUserName) {
            if (newUserName != null){
                await deleteFile(profile);
                const newProfile = newUserName + '.' + file.originalname.split('.').pop();
                fs.writeFileSync(filePath + newProfile, file.buffer);
                return "http://localhost:8080/profiles/" + newProfile; 
            }
            else{
                console.log("file.originalname", file.originalname);
                await deleteFile(profile);
                const newProfile = oldUserName + '.' + file.originalname.split('.').pop();
                fs.writeFileSync(filePath + newProfile, file.buffer);
                return "http://localhost:8080/profiles/" + newProfile; 
            }
        }
    }
    return "file not found";
}

module.exports = { craeteProfileImg, getUserProfile, updateProfile }
