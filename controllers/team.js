const teamModel = require("../models/team");
const userModel = require("../models/user");

const getTeams = async (req, res) => {
    const user = await userModel.findOne({ username: req.user.username });
    const teams = await teamModel.find({ title: user.team });
    console.log(user);
    res.render("pages/teams", { teams: teams, user: user });
};

const createTeam = async (req, res) => {
    const { title, description, users } = req.body;

    const teams = await teamModel.find({});

    try {
        const usersArray = users.split(",").map(function (value) {
            return value.trim();
        });

        const team = new teamModel({
            title: title,
            description: description,
            users: usersArray,
            company: req.user.company
        });

        await team.save();

        usersArray.forEach(async user => {
            const existUser = await userModel.findOne({ username: user });
            existUser.team = team.title;
            await existUser.save();
        });

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

    const usersArray = users.split(",").map(function (value) {
        return value.trim();
    });

    if (team) {
        await teamModel.updateOne({ _id: teamID }, {
            $set: {
                title: title,
                description: description,
                users: usersArray,
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
