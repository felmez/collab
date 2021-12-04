const taskModel = require("../models/task");

const getTasks = async (req, res) => {
    const tasks = await taskModel.find({ company: req.user.company });
    console.log('task user', req.user);
    res.render("pages/tasks", { tasks: tasks, user: req.user });
};

module.exports = {
    getTasks
};
