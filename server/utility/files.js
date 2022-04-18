const fs = require('fs');
const { createError } = require('./error/errorHandling');
const { GlobalExceptions } = require('./error/exceptions');
const pathModule = require("path");
const { reject } = require('lodash');

const deleteFile = async (profile) => {
        fs.unlink( __dirname + '/../../profiles/' + profile, function (err) {
            if (err) throw err;
            console.log('File deleted');}
            );}

// const y = require("../../")
const deleteFolder =   async (parentFolder, folderName) => {
    // const path =  pathModule.resolve(__dirname,  "/../../" + `${parentFolder}/${folderName}`);
    
    const path =  __dirname + "/../../" + `${parentFolder}/${folderName}`
    try{
        let stat = null;
        stat = fs.statSync(path);
        if(stat) {
            fs.rmSync(path ,{recursive: true, force: true});
        } 
    }
    catch(e){
        console.log("folder not not found", e);
    }
 }
  
 const createContextFiles =  async (parentFolder, folderName, files) => {
    
    if(files) {
        for(var i=0; i<files.length; i++){
            if(isFileImage(files[i].originalname.split(".").pop()) == "NOT IMAGE"){
                throw createError(GlobalExceptions.file.inavalidFile);
            }
            const path =  __dirname + "/../../" + `${parentFolder}/${folderName}/` + `${files[i].originalname}`;
           
           
            fs.writeFile(path, files[i].buffer, () => {
            });
          
    }}
 }

 
 const deleteContextFile = async (parentFolder, folderName, files) => {
   
    const directory = __dirname + "/../../" + `${parentFolder}/${folderName}/` ;
   
    
    fs.readdir(directory, (err, filesَAvailables) => {
       
        filesَAvailables.forEach(filesَAvailable => {
            for(var i=0; i<files.length; i++)
            {

                if(filesَAvailable.split('.')[0] == files[i].originalname.split('.')[0])
                {                                       
                    fs.unlinkSync( directory + filesَAvailable); 
                }
            }
                  
        });
    });
}


 const isFileImage = (fileExtension) =>{
    let fileType;
    switch(fileExtension){  
        case 'jpeg':
        case 'jpg':
        case 'JPEG': 
        case 'JPG':       
            fileType = "image/jpeg"
            break;
        case 'png':
        case 'PNG':         
            fileType = "image/png"
            break;      
        case 'svg': 
        case 'SVG':   
            fileType = "image/svg+xml"
            break;
        case 'bmp':
        case 'BMP':   
            fileType = "image/bmp"
            break;      
        default:
            fileType = "NOT IMAGE"
 }
 return fileType;
}


 const createContextFolder = async (parentFolder, folderName) => {
    
    const path = pathModule.resolve(__dirname, "../../" + `${parentFolder}/${folderName}`)
    try {
       
        let stat = null;
        stat = fs.statSync(path);
        
        }
    catch (e) {
        fs.mkdirSync(path);
    }
 }

 const loadFileNames = async () => {
    try {
        dir = "../downloads/";
        const fileNames = [];
        fs.readdirSync(dir).forEach(file => {
            fileNames.push(file);
        });
        return fileNames;
    } catch (error) {
        return
    }
}

 const loadContextFolder = (parentFolder, folderName) => {
    const path = pathModule.resolve(__dirname, "../../" + `${parentFolder}/${folderName}`);
    const fileNames = [];
    const fileBuffers = [];
    fs.readdirSync(path).forEach(file => {
        fileNames.push(file);
    });
    for(var i=0; i<fileNames.length; i++){
        const buffer = fs.readFileSync(path + `/${fileNames[i]}`);
        fileBuffers.push(buffer);
    }
    return { fileNames, fileBuffers }
}


const renameFolder = (parentFolder, folderName, newFolderName) => {
    const path = pathModule.resolve(__dirname, "../../" + `${parentFolder}/${folderName}`);
    const newPath = pathModule.resolve(__dirname, "../../" + `${parentFolder}/${newFolderName}`);
    console.log("path:", path);
    console.log("newPath:", newPath);
    try{
        fs.renameSync(path, newPath);
    }
    catch(e){
        console.log(e);
    }
}


const getFolders = (parentFolder) =>
  {const path = pathModule.resolve(__dirname, "../../" + `${parentFolder}`);
    return fs.readdirSync(path, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)}



// const getFileType = (fileExtension) => {
//     let fileType;
//     switch(fileExtension){
//         case 'rar':
//         case 'RAR':
//             fileType = "application/vnd.rar"
//             break;
//         case 'zip':
//         case 'ZIP':
//             fileType = "application/zip"
//             break;    
//         case 'pdf':
//         case 'PDF':    
//             fileType = "application/pdf"
//             break;   
//         case 'doc':
//         case 'DOC':
//             fileType = "application/msword"
//             break;
//         case 'docx':
//         case 'DOCX':
//             fileType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//             break;  
//         case 'jpeg':
//         case 'jpg':
//         case 'JPEG': 
//         case 'JPG':       
//             fileType = "image/jpeg"
//             break;
//         case 'png':
//         case 'PNG':         
//             fileType = "image/png"
//             break;      
//         case 'svg': 
//         case 'SVG':   
//             fileType = "image/svg+xml"
//             break;
//         case '7z': 
//         case '7Z':   
//             fileType = "application/x-7z-compressed"
//             break;
//         case 'bmp':
//         case 'BMP':   
//             fileType = "image/bmp"
//             break;      
//         case 'ppt':
//         case 'PPT':   
//             fileType = "application/vnd.ms-powerpoint"
//             break;
//         case 'pptx':
//         case 'PPTX':
//             fileType = "application/vnd.openxmlformats-officedocument.presentationml.presentation"  
//             break;
//         case 'xls':
//         case 'XLS':
//             fileType = "application/vnd.ms-excel"  
//             break;
//         case 'xlsx':
//         case 'XLSX':
//             fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"  
//             break;
//         default:
//             fileType = "Invalid File"
//  }
//  return fileType;
// }


const getFileType = (fileExtension) => {
    let fileType;
    switch(fileExtension){   
        case 'pdf':
        case 'PDF':    
            fileType = "application/pdf"
            break;   
        case 'doc':
        case 'DOC':
            fileType = "application/msword"
            break;
        case 'docx':
        case 'DOCX':
            fileType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            break;  
        case 'jpeg':
        case 'jpg':
        case 'JPEG': 
        case 'JPG':       
            fileType = "image/jpeg"
            break;
        case 'png':
        case 'PNG':         
            fileType = "image/png"
            break;      
        case 'svg': 
        case 'SVG':   
            fileType = "image/svg+xml"
            break;
        case 'bmp':
        case 'BMP':   
            fileType = "image/bmp"
            break;      
        case 'ppt':
        case 'PPT':   
            fileType = "application/vnd.ms-powerpoint"
            break;
        case 'pptx':
        case 'PPTX':
            fileType = "application/vnd.openxmlformats-officedocument.presentationml.presentation"  
            break;
        default:
            fileType = "Invalid File"
 }
 return fileType;
}


const initFolders = (mkFolder) => {
    mkFolder("../files");
    mkFolder("../profiles");
    mkFolder("../context");
    mkFolder("../context/winner"); 
    mkFolder("../context/about"); 
    mkFolder("../context/news");
    mkFolder("../context/judge");
    mkFolder("../context/info");  
}
const folderExists = (parentFolder, folderName) => {
    const path = pathModule.resolve(__dirname, "../../" + `${parentFolder}/${folderName}`)
    try {
            let stat = null;
            stat = fs.statSync(path);
            return true;
        }
    catch (e) {
        // fs.mkdirSync(path);
        return false;
    }
}

module.exports = { deleteFile, deleteFolder, createContextFiles, createContextFolder, loadContextFolder, renameFolder, getFileType, initFolders, getFolders, loadFileNames, folderExists,deleteContextFile}