const express = require("express");
const router = express.Router();

const { isLogged } = require('../middleware/isLogged');

const taskController = require("../controllers/task");

router.get("/", isLogged, taskController.getTasks);
router.post("/create", isLogged, taskController.createTask);
// router.post("/update/:id", isLogged, taskController.updateTask);
router.delete("/delete/:id", isLogged, taskController.deleteTask);

module.exports = router;
