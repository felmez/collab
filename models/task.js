const mongoose = require("mongoose");

const Task = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    team: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    company: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("tasks", Task);
