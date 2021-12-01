const express = require("express");
const router = express.Router();

const { isAdmin } = require('../middleware/isAdmin');

const userController = require("../controllers/user");

router.get("/", isAdmin, userController.getUsers);
router.post("/admin", userController.registerAdmin);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

module.exports = router;
