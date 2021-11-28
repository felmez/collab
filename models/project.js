const mongoose = require("mongoose");

const Project = new mongoose.Schema({
    title: {s
        type: String,
        required: true
    },
    userRef: {
        type: String,
        required: true
    },
    tasks: {
        type: Array,
        default: []
    }
});


module.exports = mongoose.model("projects", Project);
