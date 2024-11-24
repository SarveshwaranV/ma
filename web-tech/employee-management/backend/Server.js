const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');
const fs = require('fs');
const cors = require('cors');
const employeeRoutes = require('./routes/employee.routes');
const Employee = require('./models/employee.model');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));


const importInitialData = () => {
  const parser = new xml2js.Parser();
  fs.readFile('./initialData.xml', (err, data) => {
    if (err) {
      console.error('Error reading XML file:', err);
      return;
    }
    parser.parseString(data, async (err, result) => {
      if (err) {
        console.error('Error parsing XML:', err);
        return;
      }
      const employees = result.employees.employee.map((emp) => ({
        name: emp.name[0],
        position: emp.position[0],
        department: emp.department[0],
        salary: parseFloat(emp.salary[0]),
        photo: emp.photo[0],
      }));
      await Employee.insertMany(employees);
      console.log('Initial data imported');
    });
  });
};

app.use('/api/employees', employeeRoutes);
importInitialData();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
