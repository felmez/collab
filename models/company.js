const { Timestamp } = require('bson');
const mongoose = require("mongoose");

const Company = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    numberOfEmployees: {
        type: Number,
        required: true
    },
    businessField: {
        type: String,
        required: true
    },
    admin: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model("companies", Company);
