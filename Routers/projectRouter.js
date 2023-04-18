const express = require('express');
const { createProject, deleteProject, updateProject, getProject, filterProject } = require('../controller/projectController');

Router = express.Router();

// Create a new project
Router.route('/create').post(createProject);

// Update project using id
Router.route('/update/:id').patch(updateProject);

// Get project using id
Router.route('/get/:id').get(getProject);

// Filter project using query
Router.route('/filter').get(filterProject);

// Delete project using id
Router.route('/delete/:id').delete(deleteProject);

module.exports = Router; 