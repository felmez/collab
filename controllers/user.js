const userModel = require("../models/user");

const getUsers = async (req, res) => {
    const users = await userModel.find({});

    if (users.length > 0) {
        res.status(200).json(users);
        // res.render("dashboard/users", { users: users });
    } else {
        res.status(404).json('no users found');
    }
};

module.exports = {
    getUsers
};
