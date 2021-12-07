const express = require("express");
const router = express.Router();

const { isLogged } = require('../middleware/isLogged');

const chatController = require("../controllers/chat");

router.get("/", isLogged, chatController.getChats);
router.post("/create", isLogged, chatController.createChat);

module.exports = router;
