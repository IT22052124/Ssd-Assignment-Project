const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
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
    category: {
      type: String,
      required: [true, "Please Enter a Category"],
      trim: true,
    },
    Alert_quantity: {
      type: Number,
      required: [true, "Please Enter a Quantity"],
    },
    Stock: {
      type: Number,
      required: [true, "Please Enter a Quantity"],
    },
    price: {
      type: String,
      required: [true, "Please Enter a Price"],
      trim: true,
    },
    weight: {
      type: Number,
      required: [true, "Please Enter a Weight"],
    },
    description: {
      type: String,
      required: false,
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

const product = mongoose.model("Product",productSchema);
module.exports = product;
