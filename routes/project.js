const express = require("express");
const router = express.Router();

const projectController = require("../controllers/project");

router.get("/", projectController.getProjects);

module.exports = router;
