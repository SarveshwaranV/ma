const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'bookstore'
});

db.connect((err) => {
  if (err) {
    console.error('error connecting:', err);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

app.use(bodyParser.json());

app.get('/api/books', (req, res) => {
  db.query('SELECT * FROM books', (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(rows);
    }
  });
});

app.post('/api/books', (req, res) => {
  const book = req.body;
  db.query('INSERT INTO books SET ?', book, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: 'Book added successfully' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});