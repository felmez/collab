const mongoose = require("mongoose");

const uri = process.env.DB_URI;

const connectToMongo = () => {
    mongoose.connect(uri, { useNewUrlParser: true });

    db = mongoose.connection;

    db.once("open", () => {
        console.log("Database connected: ", uri);
    });

    db.on("error", (err) => {
        console.error("Database connection error: ", err);
    });
};

module.exports = connectToMongo;
