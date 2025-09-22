const mongoose = require("mongoose");

const WholesalecustomerSchema = mongoose.Schema(
  {
    ID: {
      type: String,
      required: [true, "Please Enter Customer ID"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Please Enter Customer Name"],
      trim: true,
    },
    telephone: {
      type: Number,
      required: [true, "Please Enter telephone No"],
      trim:true,
    },
    address: {
      type: String,
      required: [true, "Please Enter Address"],
      trim: true,
    },
    email: {
        type: String,
        default: 0,
      },
    creditlimit: {
      type: Number,
      default: 0,
    },
    credit: {
      type: Number,
      default: 0,
    },
   
  },
  {
    timestamps: true,
  }
);

const wholesalecustomer = mongoose.model("Wholesalecustomer",WholesalecustomerSchema);
module.exports = wholesalecustomer;
