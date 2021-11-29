require("dotenv").config();
const express = require("express");
const passport = require('passport');
const cookieParser = require('cookie-parser');

const connectToMongo = require("./database/config");
const apiRoutes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.static('assets'));

app.set("view engine", "ejs");
app.set("views", "views");


app.use('/api', apiRoutes);

app.get("/", async (req, res) => {
    res.render("index.ejs");
});
app.get("/login", async (req, res) => {
    res.render("pages/login.ejs");
});
app.get("/register", async (req, res) => {
    res.render("pages/register.ejs");
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
    connectToMongo();
});

module.exports = app;
