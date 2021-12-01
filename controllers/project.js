const projectModel = require("../models/project");

const getProjects = async (req, res) => {
    const projects = await projectModel.find({});

    if (projects.length > 0) {
        res.render("pages/projects", { projects: projects });
    } else {
        res.status(404).json('no projects found');
    }
};

module.exports = {
    getProjects
};
