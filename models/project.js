const mongoose = require("mongoose");

const Project = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    tasks: {
        type: Array,
        default: []
    },
    company: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("projects", Project);
