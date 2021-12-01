const express = require("express");
const router = express.Router();

const { isLogged } = require('../middleware/isLogged');

const teamController = require("../controllers/team");

router.get("/", isLogged, teamController.getTeams);
router.post("/create", isLogged, teamController.createTeam);
router.post("/update/:id", isLogged, teamController.updateTeam);
router.delete("/delete/:id", isLogged, teamController.deleteTeam);

module.exports = router;
