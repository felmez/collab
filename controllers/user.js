const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require("../models/user");
const { SECRET_KEY } = require('../middleware/isLogged');


const getUsers = async (req, res) => {
    const users = await userModel.find({});

    if (users.length > 0) {
        res.render("pages/users", { users: users, user: req.user });
    } else {
        res.status(404).json('no users found');
    }
};

const createUser = async (req, res) => {
    const { username, name, email, title, role, picture, phone } = req.body;

    const users = await userModel.find({});

    try {
        const user = new userModel({
            username: username,
            name: name,
            email: email,
            title: title,
            role: role,
            picture: picture,
            phone: phone
        });

        await user.save();

        if (user._id) {
            res.redirect("/api/users");
        } else {
            res.render("pages/users", { error: 'could not create user', user: req.user, users: users });
        }
    } catch (error) {
        console.log(req.user);
        res.render("pages/users", { error: error, user: req.user, users: users });
    }
};

const deleteUser = async (req, res) => {
    const userID = req.params.id;

    const user = await userModel.findOne({ _id: userID });

    if (user) {
        if (user._id == req.user.id) {
            res.status(200).json('you can\'t delete yourself');
        } else {
            await userModel.findByIdAndDelete(userID).then(() => {
                res.status(200).json('user deleted successfully');
            }).catch(() => {
                res.status(200).json('could not delete this user');
            });
        }
    } else {
        res.status(422).json('user not found');
    }
};

const updateUser = async (req, res) => {
    const userID = req.params.id;

    const { username, name, email, title, role, picture, phone } = req.body;

    console.log(req.body);

    const user = await userModel.findOne({ _id: userID });

    if (user) {
        await userModel.updateOne({ _id: userID }, {
            $set: {
                username: username,
                name: name,
                email: email,
                title: title,
                role: role,
                picture: picture,
                phone: phone
            }
        }, { new: true }).then(() => {
            res.status(200).json('user updated successfully');
        }).catch(() => {
            res.status(422).json('could not update this user');
        });
    } else {
        res.status(422).json('user not found');
    }
};

const registerAdmin = async (req, res) => {
    const { username, email, role, password, confirmPassword } = req.body;

    try {
        const existUser = await userModel.findOne({ $or: [{ username: username }, { email: email }] });

        // check if user unique
        if (existUser) {
            return res.status(400).render('pages/register', { error: 'username / email is already used' });
        }

        // check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).render('pages/register', { error: 'passwords do not match' });
        }

        // check if role is admin
        if (role !== 'admin') {
            return res.status(400).render('pages/register', { error: 'role should be admin' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            username,
            email,
            role,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).redirect('/');

    } catch (error) {
        return res.status(400).render('pages/register', { error: error });
    }
};

const login = async (req, res) => {

    console.log(req.body);
    const { email, password } = req.body;

    const existUser = await userModel.findOne({ email: email });

    if (!existUser) {
        return res.status(400).render('pages/login', { error: 'wrong username or password' });
    }

    const valid = await bcrypt.compare(password, existUser.password);

    if (!valid) {
        return res.status(400).render('pages/login', { error: 'wrong username or password' });
    }

    const userInToken = {
        id: existUser._id,
        name: existUser.name,
        username: existUser.username,
        email: existUser.email,
        role: existUser.role,
        picture: existUser.picture
    };

    const token = jwt.sign(userInToken, SECRET_KEY, {
        expiresIn: '15min',
    });

    res.cookie('token', token, {
        httpOnly: true,
    });

    res.status(200).redirect('/dashboard');
};

const logout = async (req, res) => {
    return res.clearCookie('token').status(400).render('pages/login');
};

module.exports = {
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    registerAdmin,
    login,
    logout
};
