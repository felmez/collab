const companyModel = require("../models/company");

const getCompanies = async (req, res) => {
    const companies = await companyModel.find({ admin: req.user.username });
    res.render("pages/companies", { companies: companies, user: req.user });
};

const createCompany = async (req, res) => {
    const { name, numberOfEmployees, businessField } = req.body;

    const companies = await companyModel.find({});

    try {
        const company = new companyModel({
            name: name,
            numberOfEmployees: numberOfEmployees,
            businessField: businessField,
        });

        await company.save();

        if (company._id) {
            res.redirect("/api/companies");
        } else {
            res.render("pages/companies", { error: 'could not create company', user: req.user, companies: companies });
        }
    } catch (error) {
        res.render("pages/companies", { error: error, user: req.user, companies: companies });
    }
};

const updateCompany = async (req, res) => {
    const companyID = req.params.id;

    const { name, numberOfEmployees, businessField } = req.body;

    const company = await companyModel.findOne({ _id: companyID });

    if (company) {
        await companyModel.updateOne({ _id: companyID }, {
            $set: {
                name: name,
                numberOfEmployees: numberOfEmployees,
                businessField: businessField,
            }
        }, { new: true }).then(() => {
            res.redirect("/api/companies");
        }).catch(() => {
            res.render("pages/companies", { error: 'could not create company' });
        });
    } else {
        res.render("pages/companies", { error: 'company not found' });
    }
};

const deleteCompany = async (req, res) => {
    const companyID = req.params.id;

    const company = await companyModel.findOne({ _id: companyID });

    if (company) {
        await companyModel.findByIdAndDelete(companyID).then(() => {
            res.status(200).json('company deleted successfully');
        }).catch(() => {
            res.status(422).json('could not delete this company');
        });

    } else {
        res.status(422).json('company not found');
    }
};

module.exports = {
    getCompanies,
    createCompany,
    updateCompany,
    deleteCompany
};
