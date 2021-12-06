const mongoose = require("mongoose");

const Team = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    users: {
        type: [String],
        required: true
    },
    company: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("teams", Team);
