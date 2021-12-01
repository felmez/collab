const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        default: '$2b$10$bH7/rWvG.ugrvfdPXNxRteiVO3fH4ujZmqo5j2NFsO5TUtUL0tkVq'
    },
    role: {
        type: String,
        required: [true, 'role is required'],
        default: 'employee',
        enum: {
            values: ['admin', 'manager', 'employee'],
            message: "user role should be equal to 'admin' or 'manager' or 'employee'"
        },
    },
    name: {
        type: String,
        default: ''
    },
    picture: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model("users", User);
