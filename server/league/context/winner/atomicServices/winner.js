const { dbErrorHandling } = require('../../../../utility/error/dbError');
const { Winner } = require('../model/winner');


const  craeteWinner = async (leagueRound, abb, rank, planEnvoy, team) => {
    try{
        let winner = new Winner({
            leagueRound: leagueRound,
            abb: abb,
            rank: rank,
            planEnvoy: planEnvoy,
            team: team,
            issuedDate: new Date().getTime()
        })
        winner = await winner.save();
        return winner
    }
    catch (error) {
        await dbErrorHandling(error);
    }
}


const deleteWinner = async (winnerId) => {
    const winner = await Winner.findOneAndDelete({_id: winnerId});
    return winner
}

const loadWinners = async () => {
    const winners = await Winner.find({});
    return winners
}

const updateWinner = async (winnerId, leagueRound,abb,rank,
    planEnvoy,team) => {
    const query = {};
    if(leagueRound) query.leagueRound = leagueRound;
    if(abb) query.abb = abb;
    if(rank) query.rank = rank;
    if(planEnvoy) query.planEnvoy = planEnvoy;
    if(team) query.team = team;
    const winners = await Winner.findOneAndUpdate({_id: winnerId}, query, {new: true});
    return winners
}

const getWinner = async (winnerId) => {
    const winner = await Winner.findOne({_id: winnerId});
    return winner
}


module.exports = { craeteWinner, deleteWinner, loadWinners, updateWinner, getWinner }