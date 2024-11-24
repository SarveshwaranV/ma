const express = require('express');
const app = express();
const cors = require("cors")
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(cors())
mongoose.connect('mongodb://localhost/products', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });

const productSchema = mongoose.Schema({
  name: String,
  category: String
});

const Product = mongoose.model('Product', productSchema);

app.use(bodyParser.json());

app.get('/api/products', async (req, res) => {
  try {
    
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.send(savedProduct);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});