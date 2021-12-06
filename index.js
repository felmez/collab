require("dotenv").config();
const express = require("express");
const passport = require('passport');
const cookieParser = require('cookie-parser');

const connectToMongo = require("./database/config");
const apiRoutes = require('./routes');
const { isLogged } = require('./middleware/isLogged');

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

app.get("/", isLogged, async (req, res) => {
    if (req.user.id) {
        res.redirect('/dashboard');
    } else {
        res.render("pages/login");
    }
});

app.get("/dashboard", isLogged, async (req, res) => {
    if (req.user.firstLogin == true) {
        res.redirect('/settings');
    } else {
        res.render("pages/dashboard", { user: req.user });
    }
    console.log(req.user);
});

app.get("/settings", isLogged, async (req, res) => {
    res.render("pages/settings", { user: req.user });
});

app.get("/secret", async (req, res) => {
    res.render("pages/register");
});

app.get("/feed", isLogged, async (req, res) => {
    res.render("pages/feed", { user: req.user });
});

app.get("/calendar", async (req, res) => {
    res.render("pages/calendar");
});

app.get("/profile", isLogged, async (req, res) => {
    res.render("pages/profile", { user: req.user });
});

app.get("/survey", async (req, res) => {
    res.render("pages/survey");
});

app.get("/messages", async (req, res) => {
    res.render("pages/messages");
});

app.get("/analytics", isLogged, async (req, res) => {
    res.render("pages/analytics", { user: req.user });
});


app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
    connectToMongo();
});

module.exports = app;
