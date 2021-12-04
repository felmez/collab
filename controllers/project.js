const projectModel = require("../models/project");

const getProjects = async (req, res) => {
    const projects = await projectModel.find({ company: req.user.company });
    res.render("pages/projects", { projects: projects, user: req.user });
};

const createProject = async (req, res) => {
    const { title, user, tasks } = req.body;

    const projects = await projectModel.find({});

    try {
        const project = new projectModel({
            title: title,
            user: user,
            tasks: tasks,
            company: req.user.company
        });

        await project.save();

        if (project._id) {
            res.redirect("/api/projects");
        } else {
            res.render("pages/projects", { error: 'could not create project', user: req.user, projects: projects });
        }
    } catch (error) {
        res.render("pages/projects", { error: error, user: req.user, projects: projects });
    }
};

const updateProject = async (req, res) => {
    const projectID = req.params.id;

    const { title, user, tasks } = req.body;

    const project = await projectModel.findOne({ _id: projectID });

    if (project) {
        await projectModel.updateOne({ _id: projectID }, {
            $set: {
                title: title,
                user: user,
                tasks: tasks,
            }
        }, { new: true }).then(() => {
            res.redirect("/api/projects");
        }).catch(() => {
            res.render("pages/projects", { error: 'could not create project' });
        });
    } else {
        res.render("pages/projects", { error: 'project not found' });
    }
};

const deleteProject = async (req, res) => {
    const projectID = req.params.id;

    const project = await projectModel.findOne({ _id: projectID });

    if (project) {
        await projectModel.findByIdAndDelete(projectID).then(() => {
            res.status(200).json('project deleted successfully');
        }).catch(() => {
            res.status(422).json('could not delete this project');
        });

    } else {
        res.status(422).json('project not found');
    }
};

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject
};
