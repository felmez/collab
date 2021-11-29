const express = require('express');
const routes = express.Router();

const userRoutes = require('./user');
const taskRoutes = require('./task');
const projectRoutes = require('./project');
const companyRoutes = require('./company');

routes.use('/users', userRoutes);
routes.use('/tasks', taskRoutes);
routes.use('/projects', projectRoutes);
routes.use('/companies', companyRoutes);

module.exports = routes;
