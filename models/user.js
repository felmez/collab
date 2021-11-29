const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: {
            values: ['admin', 'manager', 'employee'],
            message: "user role should be equal to 'admin' or 'manager' or 'employee'"
        },
    },
    phone: {
        type: String,
    },
    title: {
        type: String,
    }
});

module.exports = mongoose.model("users", User);
