const mongoose = require('mongoose');

const employeeAttendanceSchema = new mongoose.Schema({
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
    enum: ['Present', 'Absent'],
    required: true
  }
});

const EmployeeAttendance = mongoose.model('EmployeeAttendance', employeeAttendanceSchema);

module.exports = EmployeeAttendance;
