const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const fs = require('fs');
const Product = require("./Product")


fs.readFile('products.xml', (err, data) => {
  parser.parseString(data, (err, result) => {
    const products = result.products.product;
    products.forEach((product) => {
      const newProduct = new Product({
        name: product.name[0],
        price: parseFloat(product.price[0]),
        image: product.image[0],
        category: product.category[0]
      });
      Product.insertOne(newProduct)
    });
  });
});
