const mongoose = require('mongoose');

const salaryHistorySchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: false
  },
  net:{
    type : Number,
    required: true
  }
});

const Salary = mongoose.model('SalaryHistory', salaryHistorySchema);

module.exports = Salary;