const express = require("express");
const router = express.Router();

const { isLogged } = require('../middleware/isLogged');

const projectController = require("../controllers/project");

router.get("/", isLogged, projectController.getProjects);
router.post("/create", isLogged, projectController.createProject);
router.post("/update/:id", isLogged, projectController.updateProject);
router.delete("/delete/:id", isLogged, projectController.deleteProject);

module.exports = router;
