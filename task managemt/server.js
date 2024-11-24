const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taskdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Task schema and model
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

const Task = mongoose.model('Task', taskSchema);

// API routes
app.get('/tasks', (req, res) => {
    Task.find().then(tasks => res.json(tasks))
              .catch(err => res.status(500).json(err));
});

app.post('/tasks', (req, res) => {
    const newTask = new Task(req.body);
    newTask.save()
           .then(t=> res.status(201).json(t))
           .catch(err => res.status(400).json(err));
});

app.delete('/tasks/:id', (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.json('Task deleted'))
        .catch(err => res.status(400).json(err));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
