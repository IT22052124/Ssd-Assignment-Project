const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema(
  {
    ID: {
      type: String,
      required: [true, "Please Enter Employee ID"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Please Enter a Name"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Please Enter address "],
      trim:true,
    },
    telephone: {
      type: String,
      required: [true, "Please Enter telephone"],
      trim: true,
    },
    mail: {
      type: String,
      required: [true, "Please Enter email"],
      trim: true,
    },
    type: {
      type: String,
      default: 0,
    },
    hourlywage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const employee = mongoose.model("Employee",EmployeeSchema);
module.exports = employee;
