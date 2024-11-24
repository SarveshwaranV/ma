const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/cloths', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
})

// Mongoose schema and model
const clothSchema = new mongoose.Schema({
    name: String,
    price: Number
});

const ClothItem = mongoose.model('ClothItem', clothSchema);

// Create a new clothing item
app.post('/cloths', (req, res) => {
    const newItem = new ClothItem(req.body);
    newItem.save()
        .then(item => res.status(201).json(item)) 
});

// Read all clothing items
app.get('/cloths', (req, res) => {
    ClothItem.find()
        .then(items => res.json(items)) // Respond with all items
        
});

// Delete a clothing item
app.delete('/cloths/:id', (req, res) => {
    ClothItem.findByIdAndDelete(req.params.id)
        .then(() => res.json('Item deleted.'))
   
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
