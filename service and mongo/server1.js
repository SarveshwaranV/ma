const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/sarvesh', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const clothSchema = new mongoose.Schema({
    name: String,
    price: Number
});

const ClothItem = mongoose.model('varans', clothSchema);

// Create a new clothing item
app.post('/cloths', (req, res) => {
    const newItem = new ClothItem(req.body);
    newItem.save()
});

// Read all clothing items
app.get('/cloths', (req, res) => {
    ClothItem.find()
        .then(items => res.json(items)) // Respond with all items
        .catch(err => res.status(500).json({ error: err.message })); // Handle errors
});

// Update a clothing item
app.put('/cloths/:id', (req, res) => {
    ClothItem.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(item => res.json(item))
        .catch(err => res.status(400).json({ error: err.message })); // Handle errors
});

// Delete a clothing item
app.delete('/cloths/:id', (req, res) => {
    ClothItem.findByIdAndDelete(req.params.id)
        .then(() => res.json('Item deleted.'))
        .catch(err => res.status(400).json({ error: err.message })); // Handle errors
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
