const mongoose = require("mongoose");

const Chat = new mongoose.Schema({
    receiver: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("chats", Chat);
