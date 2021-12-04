const mongoose = require("mongoose");

const Team = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    users: {
        type: [String]
    },
    company: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("teams", Team);
