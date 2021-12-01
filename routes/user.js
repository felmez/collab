const express = require("express");
const router = express.Router();

const { isAdmin } = require('../middleware/isAdmin');

const userController = require("../controllers/user");

router.get("/", isAdmin, userController.getUsers);
router.post("/admin", userController.registerAdmin);
router.post("/create", isAdmin, userController.createUser);
router.post("/update/:id", isAdmin, userController.updateUser);
router.delete("/delete/:id", isAdmin, userController.deleteUser);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

module.exports = router;
