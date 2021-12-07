const chatModel = require("../models/chat");
const userModel = require("../models/user");

const getChats = async (req, res) => {
    const user = await userModel.findOne({ username: req.user.username });
    const chats = await chatModel.find({
        $or: [{
            sender: user.username
        }, {
            receiver: user.username
        }]
    });
    res.render("pages/chats", { chats: chats, user: user });
};


const createChat = async (req, res) => {
    const sender = await userModel.findOne({ username: req.user.username });
    const { receiver, message } = req.body;
    const receiverUser = await userModel.findOne({ username: receiver });

    const chats = await chatModel.find({
        $or: [{
            sender: sender.username
        }, {
            receiver: sender.username
        }]
    });

    if (receiverUser) {
        const newChat = new chatModel({
            sender: sender.username,
            receiver: receiverUser.username,
            message: message
        });

        await newChat.save();
        res.status(200).redirect('/api/chats');
    } else {
        res.render("pages/chats", { error: 'receiver user not found, try another username', user: sender, chats: chats });
    }

    console.log(receiver, message);
    console.log(sender);
};


module.exports = {
    getChats,
    createChat
};
