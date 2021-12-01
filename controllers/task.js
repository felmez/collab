const taskModel = require("../models/task");

const getTasks = async (req, res) => {
    const tasks = await taskModel.find({});

    if (tasks.length > 0) {
        res.render("pages/tasks", { tasks: tasks });
    } else {
        res.status(404).json('no tasks found');
    }
};

module.exports = {
    getTasks
};
