const express = require("express");
const router = express.Router();

const { isLogged } = require('../middleware/isLogged');

const taskController = require("../controllers/task");

router.get("/", isLogged, taskController.getTasks);

module.exports = router;
