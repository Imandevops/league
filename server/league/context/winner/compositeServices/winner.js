const { GlobalExceptions } = require("../../../../utility/error/exceptions");
const { createError } = require("../../../../utility/error/errorHandling");
const { craeteWinner, deleteWinner, loadWinners, updateWinner, getWinner } = require("../atomicServices/winner");
const { deleteFolder, createContextFolder, createContextFiles, loadContextFolder, getFileType, renameFolder } = require('../../../../utility/files');
const { query } = require("express");


const wsCreateWinner = async (
    leagueRound,abb,rank,
    planEnvoy,team, files) => {
       const winner = await craeteWinner(leagueRound, abb, rank, planEnvoy, team);
       const folderName = `${leagueRound}-${abb}-${rank}`;
        try{
            await createContextFolder("context/winner", folderName);
            await createContextFiles("context/winner", folderName, files);
        }
        catch(e){
            await deleteWinner(winner._id);
            throw createError(GlobalExceptions.context.winner.winnerNotCreated);
        }

        return winner;

    }


const wsLoadWinners = async() => {
        const winners = await loadWinners();
        console.log("winners", winners);
        return  winners.map((w) => {
            const folderName = `${w.leagueRound}-${w.abb}-${w.rank}`;
            const { fileNames, fileBuffers } = loadContextFolder("context/winner", folderName);

            let companyName;
            switch (w.abb) {
                case "BSM":
                    companyName = "بهسازان ملت";
                    break;
                case "BPM":
                    companyName = "به پرداخت ملت";
                    break;
                case "SYS":
                    companyName = "مهندسی سیستم یاس";
                    break;
                case "YaasSie":
                    companyName = "مهندسی سیستم یاس ارغوانی";
                    break;
                case "SITS":
                    companyName = "زیرساخت امن خدمات تراکنشی";
                    break;
                case "SHGH":
                    companyName = "مهندسی نرم افزار شقایق";
                    break;
                default:
                    companyName = "نامشخص";
            }
            const fileType = getFileType(fileNames[0].split(".").pop());
            return {
                id: w._id,
                leagueRound: w.leagueRound,
                companyName: companyName,
                rank: w.rank,
                planEnvoy: w.planEnvoy,
                team: w.team,
                issuedDate: w.issuedDate,
                abb: w.abb,
                image: {fileName: fileNames[0],
                    type: fileType,
                     data: fileBuffers[0]}
            }
        })
    }


const wsUpdateWinner = async (winnerId, leagueRound,abb,rank,
    planEnvoy,team, files) => {
        try{
            const oldWinner = await getWinner(winnerId);
            console.log("old winner", oldWinner);
            const folderName = `${oldWinner.leagueRound}-${oldWinner.abb}-${oldWinner.rank}`;
            if(files){
                if(leagueRound && abb && rank ) {
                    deleteFolder("context/winner",folderName);
                    const newFolder = `${leagueRound}-${abb}-${rank}`;
                    await createContextFolder("context/winner", newFolder);
                    await createContextFiles("context/winner", newFolder, files);
                }
            }
            else{
                if(leagueRound !=null && abb !=null && rank !=null){
                    const newFolder = `${leagueRound}-${abb}-${rank}`;
                    renameFolder("context/winner", folderName, newFolder);
                }
            }
        }
        catch(e){
            console.log(e);
            throw createError(GlobalExceptions.context.winner.winnerNotCreated);
        }
        const winner = await updateWinner(winnerId, leagueRound,abb,rank,
            planEnvoy,team);
        return winner;
    }
    
const wsDeleteWinner = async(winnerId) => {
    const winner = await deleteWinner(winnerId);
    return winner;
 }  


module.exports = { wsCreateWinner, wsLoadWinners, wsUpdateWinner, wsDeleteWinner }    