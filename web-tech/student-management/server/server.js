const express = require('express');
const bodyParser = require('body-parser');
const db = require('./dbConfig');
const app = express();
const cors = require('cors');

// Enable CORS
app.use(cors());


app.use(bodyParser.json());

function formatDateToMySQL(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function calculateGrade(marks) {
    const average = marks.reduce((a, b) => a + b, 0) / marks.length;

    if (average >= 90) return 'A';
    if (average >= 80) return 'B';
    if (average >= 70) return 'C';
    if (average >= 60) return 'D';
    return 'F';
}


// Get Students
app.get('/api/students', (req, res) => {
    const sql = 'SELECT * FROM students';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving students:', err);
            res.status(500).json({ error: 'Error fetching students' });
            return;
        }
        res.status(200).json(results);
    });
});



// Add Student
const moment = require('moment');

app.post('/api/students', (req, res) => {
    const { name, birthDate, class: studentClass, subject1_marks, subject2_marks, subject3_marks } = req.body;

    // Calculate grade
    const grade = calculateGrade([subject1_marks, subject2_marks, subject3_marks]);

    const sql = `
        INSERT INTO students (name, birthDate, class, subject1_marks, subject2_marks, subject3_marks, grade) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [name, birthDate, studentClass, subject1_marks, subject2_marks, subject3_marks, grade], (err, result) => {
        if (err) {
            console.error('Error inserting student:', err);
            res.status(500).json({ error: 'Error saving student' });
            return;
        }
        res.status(201).json({ id: result.insertId, name, birthDate, studentClass, subject1_marks, subject2_marks, subject3_marks, grade });
    });
});




// Delete Student
app.delete('/api/students/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM students WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
