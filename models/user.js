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
        required: [true, 'password is required']
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
    },
    picture: {
        type: String,
    },
    phone: {
        type: String,
    },
    title: {
        type: String,
    }
});

module.exports = mongoose.model("users", User);
