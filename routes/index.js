const express = require('express');
const routes = express.Router();

const userRoutes = require('./user');
const taskRoutes = require('./task');
const projectRoutes = require('./project');
const companyRoutes = require('./company');
const teamRoutes = require('./team');

routes.use('/users', userRoutes);
routes.use('/tasks', taskRoutes);
// routes.use('/projects', projectRoutes);
// routes.use('/companies', companyRoutes);
routes.use('/teams', teamRoutes);

module.exports = routes;
