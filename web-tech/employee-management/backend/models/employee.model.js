const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  department: String,
  salary: Number,
  photo: String,
});

module.exports = mongoose.model('Employee', EmployeeSchema);
