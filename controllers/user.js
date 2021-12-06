const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const userModel = require("../models/user");
const companyModel = require("../models/company");
const { SECRET_KEY } = require('../middleware/isLogged');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'collabplatformio@gmail.com',
        pass: '12345678@B'
    }
});


const getUsers = async (req, res) => {
    const users = await userModel.find({ company: req.user.company });
    res.render("pages/users", { users: users, user: req.user });
};

const createUser = async (req, res) => {
    const { username, name, email, title, role, picture, phone } = req.body;

    const users = await userModel.find({ company: req.user.company });

    try {

        const existUser = await userModel.findOne({ $or: [{ username: username }, { email: email }] });

        // check if user unique
        if (existUser) {
            return res.status(400).render("pages/users", { user: req.user, users: users, error: 'username / email is already used' });
        }

        const user = new userModel({
            username: username,
            name: name,
            email: email,
            title: title,
            role: role,
            picture: picture,
            phone: phone,
            company: req.user.company
        });

        const mailOptions = {
            from: 'collabplatformio@gmail.com',
            to: email,
            subject: 'Your account created successfully',
            text: `You can login the to platform by the information below: \n
            Login URL: http://localhost:3000
            Email: ${email} \n
            Password: 1234 \n
            Don't forget to change your password as soon as possible. \n
            Thank you for using Collab.`
        };

        await user.save().then(() => {
            console.log('its done here', user);
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(info.response);
                }
            });
            res.redirect("/api/users");
        }).catch(() => {
            res.render("pages/users", { error: 'could not create user', user: req.user, users: users });
        });

    } catch (error) {
        res.render("pages/users", { error: error, user: req.user, users: users });
    }
};

const deleteUser = async (req, res) => {
    const userID = req.params.id;

    const user = await userModel.findOne({ _id: userID });

    if (user) {
        if (user._id == req.user.id) {
            res.status(422).json('you can\'t delete yourself');
        } else {
            await userModel.findByIdAndDelete(userID).then(() => {
                res.status(200).json('user deleted successfully');
            }).catch(() => {
                res.status(422).json('could not delete this user');
            });
        }
    } else {
        res.status(422).json('user not found');
    }
};

const updateUser = async (req, res) => {
    const userID = req.params.id;

    const { username, name, email, title, role, picture, phone } = req.body;

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
            res.redirect("/api/users");
        }).catch(() => {
            res.render("pages/users", { error: 'could not create user' });
        });
    } else {
        res.render("pages/users", { error: 'user not found' });
    }
};

const registerAdmin = async (req, res) => {
    const { username, email, role, password, confirmPassword, companyName, numberOfEmployees, companyImage, businessField } = req.body;

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
            company: companyName
        });

        const company = new companyModel({
            name: companyName,
            businessField: businessField,
            image: companyImage,
            numberOfEmployees: numberOfEmployees,
            admin: user.username
        });


        await company.save().then(async () => {
            await user.save().catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
        console.log(user);
        console.log(company);

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
        picture: existUser.picture,
        firstLogin: existUser.firstLogin,
        doneTour: existUser.doneTour,
        company: existUser.company,
        title: existUser.title,
        team: existUser.team
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

const changePassword = async (req, res) => {
    const { password, confirmPassword } = req.body;

    const loggedUser = req.user;

    if (password !== confirmPassword) {
        return res.status(400).render('pages/settings', { error: 'passwords does not match', user: loggedUser });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.updateOne({ username: loggedUser.username }, {
        $set: {
            password: hashedPassword,
            firstLogin: false
        }
    }, { new: true }).then(() => {
        return res.clearCookie('token').status(400).render('pages/login');
    }).catch(() => {
        res.render("pages/settings", { error: 'could not update password', user: loggedUser });
    });
};

const changeTourStatus = async (req, res) => {
    const loggedUser = req.user;

    await userModel.updateOne({ username: loggedUser.username }, {
        $set: {
            doneTour: true
        }
    }, { new: true }).then(() => {
        return res.json('status changed perfectly');
    }).catch(() => {
        res.render("pages/dashboard", { error: 'something happened', user: loggedUser });
    });
};

module.exports = {
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    registerAdmin,
    login,
    logout,
    changePassword,
    changeTourStatus
};
