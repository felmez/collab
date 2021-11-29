const taskModel = require("../models/task");

const getTasks = async (req, res) => {
    const tasks = await taskModel.find({});

    if (tasks.length > 0) {
        res.status(200).json(tasks);
        // res.render("dashboard/users", { users: users });
    } else {
        res.status(404).json('no tasks found');
    }
};

module.exports = {
    getTasks
};
