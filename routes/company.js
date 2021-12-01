const express = require("express");
const router = express.Router();

const { isLogged } = require('../middleware/isLogged');

const companyController = require("../controllers/company");

router.get("/", isLogged, companyController.getCompanies);
router.post("/create", isLogged, companyController.createCompany);
router.post("/update/:id", isLogged, companyController.updateCompany);
router.delete("/delete/:id", isLogged, companyController.deleteCompany);

module.exports = router;
