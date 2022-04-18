const crypto = require("crypto");
const fs = require("fs");
const { createError } = require("../../../utility/error/errorHandling");
const { GlobalExceptions } = require("../../../utility/error/exceptions");
const { getFileType } = require("../../../utility/files");
const { getSecurityKeys } = require('../infra/getKeys');
const algorithm = "aes-256-cbc";


const createFiles = async (files, uniqueFolder, key) => {
    documentsName = [];
    documentsUrl = [];
    for (var i = 0; i < files.length; i++) {
        const fExtension = files[i].originalname.split(".").pop();
        console.log("files: ", files);
        const fType = getFileType(fExtension);
        if(fType == "Invalid File"){
            throw createError(GlobalExceptions.file.inavalidFile);
        }
        documentsName.push(files[i].originalname);
        documentsUrl.push(uniqueFolder + '/' + files[i].originalname);
    }
    manageCryption(files, uniqueFolder, key);
    return { documentsUrl };
}

const loadFiles = async (planUniqueName) => {
    try {
        dir = "../files/" + planUniqueName;
        const fileNames = [];
        fs.readdirSync(dir).forEach(file => {
            fileNames.push(file);
        });
        return fileNames;
    } catch (error) {
        return
    }
}

//only plan files
const loadFile = async (planUniqueName, fileName) => {
    try {
        const key = await getSecurityKeys();
        filePath = "../files/" + planUniqueName + '/' + fileName;
        const data = fs.readFileSync(filePath, 'base64');
        const decryptedData = decryptIt(data, key);
        const buffer = Buffer.from(decryptedData, 'base64');
        const fileExtension = fileName.split(".").pop();
        const fileType = getFileType(fileExtension);
        const file = {
            fileName: fileName,
            type: fileType,
            data: buffer
        }
        return file
    } catch (error) {
        console.log("error",error);
        return
    }

}


function manageCryption(files, uniqueFolder, key) {
    for (var i = 0; i < files.length; i++) {
        const file = files[i];
        const buffer = file.buffer;
        //make folder if not exist
        mkFolder(uniqueFolder);
        //encrypt and save
        encryptIt(buffer, uniqueFolder + '/' + file.originalname, key);
    }
}

//make unique folder name for a plan
function mkFolder(dest) {
    try {
        let stat = null;
        stat = fs.statSync(dest);
    }
    catch (e) {
        fs.mkdirSync(dest);
    }
}

//give unique folder name for a plan
function mkUnique(abb, planIndex, planNature) {
    const dest = `../files/${abb}-${planIndex}-${planNature}`;
    return dest;
}

function encryptIt(data, filePath, key) {
    const initVector = key[0].initVector;
    const securityKey = key[0].securityKey;
    const iv = Buffer.from(initVector, 'hex');
    const sk = Buffer.from(securityKey, 'hex');
    const cipher = crypto.createCipheriv(algorithm, sk, iv);
    let encryptedData = cipher.update(data, "base64", "base64");
    encryptedData += cipher.final("base64");
    fs.writeFile(filePath, encryptedData, 'base64', (e) => {
        if (e) return console.error(e);
        console.log('saved encrypted file(s) at ', filePath);
    });
}

function decryptIt(encryptedData, key) {
    const initVector = key[0].initVector
    const securityKey = key[0].securityKey
    const iv = Buffer.from(initVector, 'hex');
    const sk = Buffer.from(securityKey, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, sk, iv);
    let decryptedData = decipher.update(encryptedData, "base64", "base64");
    decryptedData += decipher.final("base64");
    return decryptedData;
}


const generateKey = () => {
    const sk = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const key = {sk, iv};
    return key;
}


module.exports = { createFiles, mkUnique, loadFiles, loadFile, mkFolder, generateKey };