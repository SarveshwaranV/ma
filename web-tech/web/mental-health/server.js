const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mentalHealthApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Schemas and Models
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

const MoodEntrySchema = new mongoose.Schema({
    mood: String,
    stressLevel: Number,
    notes: String,
    date: { type: Date, default: Date.now },
    userId: mongoose.Schema.Types.ObjectId
});

const User = mongoose.model('User', UserSchema);
const MoodEntry = mongoose.model('MoodEntry', MoodEntrySchema);

// Register endpoint
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const newUser = new User({ username, password, email });
    await newUser.save();
    res.send({ message: 'User registered successfully' });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.send({ message: 'Login successful', userId: user._id });
    } else {
        res.status(400).send({ message: 'Invalid credentials' });
    }
});

// Mental Health Form submission
app.post('/mental-health-form', async (req, res) => {
    const { mood, stressLevel, notes, userId } = req.body;
    const newEntry = new MoodEntry({ mood, stressLevel, notes, userId });
    await newEntry.save();
    res.send({ message: 'Mental health entry saved successfully' });
});

// Mood History retrieval
app.get('/mood-history/:userId', async (req, res) => {
    const userId = req.params.userId;
    const moodEntries = await MoodEntry.find({ userId });
    res.send(moodEntries);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
