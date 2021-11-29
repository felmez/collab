const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task");

router.get("/", taskController.getTasks);

module.exports = router;
