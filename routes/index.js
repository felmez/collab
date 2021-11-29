const express = require('express');
const routes = express.Router();

const userRoutes = require('./user');
const taskRoutes = require('./task');
const projectRoutes = require('./project');
const companyRoutes = require('./company');

routes.use('/users', userRoutes);
routes.use('/projects', userRoutes);
routes.use('/tasks', userRoutes);
routes.use('/companies', userRoutes);

module.exports = routes;
