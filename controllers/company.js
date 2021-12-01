const companyModel = require("../models/company");

const getCompanies = async (req, res) => {
    const companies = await companyModel.find({});

    if (companies.length > 0) {
        res.render("pages/companies", { companies: companies });
    } else {
        res.status(404).json('no companies found');
    }
};

module.exports = {
    getCompanies
};
