const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["paid", "unpaid"],
    required: false,
  },
  days: {
    type: Number,
    required: true,
  },
  bonus: {
    type: Number,
    required: true,
  },
  net: {
    type: Number,
    required: true,
  },
});

const Salary = mongoose.model("Salary", salarySchema);

module.exports = Salary;
