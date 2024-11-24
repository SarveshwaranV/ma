const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/project-management', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });

// Define Schema for Projects
const projectSchema = mongoose.Schema({
  name: String,
  description: String
});

const Project = mongoose.model('Project', projectSchema);

// Get All Projects
app.get('/api/projects', async (req, res) => {
  try {
    console.log('Get req');
    const projects = await Project.find();
    res.send(projects);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Add a New Project
app.post('/api/projects', async (req, res) => {
  try {
    console.log('Post req');
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.send(savedProject);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a Project
app.delete('/api/projects/:projectId', async (req, res) => {
  try {
    console.log('Delete req');
    const project = await Project.findByIdAndDelete(req.params.projectId);
    res.send(project);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Update a Project
app.put('/api/projects/:projectId', async (req, res) => {
    try {
      console.log('Put req');
      const project = await Project.findByIdAndUpdate(
        req.params.projectId,
        req.body,
        { new: true } // Return the updated document
      );
      res.send(project);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
