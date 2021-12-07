const taskModel = require("../models/task");
const teamModel = require("../models/team");
const userModel = require("../models/user");
const chatModel = require("../models/chat");

const getTasks = async (req, res) => {
    const user = await userModel.findOne({ username: req.user.username });
    const tasks = await taskModel.find({ team: user.team });
    const teams = await teamModel.find({ company: req.user.company, _id: req.user.teamID });
    const chats = await chatModel.find({
        $or: [{
            sender: user.username
        }, {
            receiver: user.username
        }]
    });
    res.render("pages/tasks", { tasks: tasks, user: user, teams: teams, chats: chats });
};


const createTask = async (req, res) => {
    const { title, description } = req.body;
    const user = await userModel.findOne({ username: req.user.username });

    const chats = await chatModel.find({
        $or: [{
            sender: user.username
        }, {
            receiver: user.username
        }]
    });


    const tasks = await taskModel.find({});

    try {
        const task = new taskModel({
            title: title,
            description: description,
            team: user.team,
            company: user.company
        });

        await task.save();

        if (task._id) {
            res.redirect("/api/tasks");
        } else {
            res.render("pages/tasks", { error: 'could not create task', user: user, tasks: tasks, chats: chats });
        }
    } catch (error) {
        res.render("pages/tasks", { error: error, user: user, tasks: tasks, chats: chats });
    }
};

const deleteTask = async (req, res) => {
    const taskID = req.params.id;

    const task = await taskModel.findOne({ _id: taskID });

    if (task) {
        await taskModel.findByIdAndDelete(taskID).then(() => {
            res.status(200).json('task deleted successfully');
        }).catch(() => {
            res.status(422).json('could not delete this task');
        });
    } else {
        res.status(422).json('task not found');
    }
};

module.exports = {
    getTasks,
    createTask,
    deleteTask
};
