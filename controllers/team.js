const teamModel = require("../models/team");

const getTeams = async (req, res) => {
    const teams = await teamModel.find({ company: req.user.company });
    res.render("pages/teams", { teams: teams, user: req.user });
};

const createTeam = async (req, res) => {
    const { title, description, users } = req.body;

    const teams = await teamModel.find({});

    try {
        const team = new teamModel({
            title: title,
            description: description,
            users: users,
            company: req.user.company
        });

        await team.save();

        if (team._id) {
            res.redirect("/api/teams");
        } else {
            res.render("pages/teams", { error: 'could not create team', user: req.user, teams: teams });
        }
    } catch (error) {
        res.render("pages/teams", { error: error, user: req.user, teams: teams });
    }
};

const updateTeam = async (req, res) => {
    const teamID = req.params.id;

    const { title, description, users } = req.body;

    const team = await teamModel.findOne({ _id: teamID });

    if (team) {
        await teamModel.updateOne({ _id: teamID }, {
            $set: {
                title: title,
                description: description,
                users: users,
            }
        }, { new: true }).then(() => {
            res.redirect("/api/teams");
        }).catch(() => {
            res.render("pages/teams", { error: 'could not create team' });
        });
    } else {
        res.render("pages/teams", { error: 'team not found' });
    }
};

const deleteTeam = async (req, res) => {
    const teamID = req.params.id;

    const team = await teamModel.findOne({ _id: teamID });

    if (team) {
        await teamModel.findByIdAndDelete(teamID).then(() => {
            res.status(200).json('team deleted successfully');
        }).catch(() => {
            res.status(422).json('could not delete this team');
        });

    } else {
        res.status(422).json('team not found');
    }
};

module.exports = {
    getTeams,
    createTeam,
    updateTeam,
    deleteTeam
};
