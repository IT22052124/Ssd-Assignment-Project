const mongoose = require("mongoose");

const costSchema = mongoose.Schema(
  {
    productID: {
      type: String,
      required: [true],
    },
    productName: {
      type: String,
      required: [true],
    },
    quantity: {
      type: Number,
      required: [true],
    },
    price: {
      type: Number,
      required: [true],
    },
    inStock: {
      type: Number,
      required: [true],
      default: 0,
    },
    date: {
      type: Date,
      required: [true],
    }
  },
  {
    timestamps: true,
  }
);

const cost = mongoose.model("Cost",costSchema);
module.exports = cost;