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
    picture: {
        type: String,
    },
    role: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    }
});


module.exports = mongoose.model("users", User);
