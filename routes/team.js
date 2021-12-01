const express = require("express");
const router = express.Router();

const teamController = require("../controllers/team");

router.get("/", teamController.getTeams);

module.exports = router;
