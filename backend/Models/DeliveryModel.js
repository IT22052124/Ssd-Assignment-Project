const mongoose = require("mongoose");

const deliverySchema = mongoose.Schema(
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
    license: {
        type: String,
        required: [true, "Please Enter License No"]
      },
    numberplate: {
        type: String,
        required: [true, "Please Enter Number Plate No"]
      },
     type: {
        type: String,
        required: [true, "Please Enter the Vehicle type"],
        trim: true,
      },
      capacity: {
        type: String,
        required: [true, "Please Enter vehicle capacity"],
        trim: true,
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

const delivery = mongoose.model("Delivery",deliverySchema);
module.exports = delivery;
