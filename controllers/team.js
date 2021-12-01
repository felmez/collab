const teamModel = require("../models/task");

const getTeams = async (req, res) => {
    const teams = await teamModel.find({});

    if (teams.length > 0) {
        res.render("pages/teams", { teams: teams });
    } else {
        res.status(404).json('no teams found');
    }
};

module.exports = {
    getTeams
};
