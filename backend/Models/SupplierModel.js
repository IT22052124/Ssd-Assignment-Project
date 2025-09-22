const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema(
  {
    ID: {
      type: String,
      required: [true, "Please Enter a ID"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Please Enter a Name"],
      trim: true,
    },
    telephone: {
      type: Number,
      required: [true, "Please Enter telephone No"]
    },
    mail: {
      type: String,
      required: [true, "Please Enter Mail"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Please Enter Address"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "Please Enter City"],
      trim: true,
    },
    credit: {
      type: Number,
      default: 0,
    },
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const supplier = mongoose.model("Supplier",supplierSchema);
module.exports = supplier;
