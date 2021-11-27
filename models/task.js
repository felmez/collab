const mongoose = require("mongoose");

const Task = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    userRef: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    }
});


module.exports = mongoose.model("tasks", Task);
