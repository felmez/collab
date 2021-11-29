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

const createUser = async (req, res) => {
    const { username, name, email, title, password, role, picture, phone } = req.body;

    try {
        const user = new userModel({
            username: username,
            name: name,
            email: email,
            title: title,
            password: password,
            role: role,
            picture: picture,
            phone: phone
        });

        await user.save();

        if (user._id) {
            res.status(200).json(user);
        } else {
            res.status(422).json('could not create user');
        }
    } catch (error) {
        res.status(422).json(error.message);
    }
};

module.exports = {
    getUsers,
    createUser
};
