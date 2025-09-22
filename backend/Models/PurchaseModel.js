const mongoose = require("mongoose");

const purchaseSchema = mongoose.Schema(
  {
    ID: {
      type: String,
      required: [true, "Please Enter a ID"],
      trim: true,
    },
    total: {
      type: Number,
      required: [true],
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      required: [true],
    },
    status: {
      type: String,
      enum: ['Pending', 'Recieved'],
      default: 'Pending',
    }
  },
  {
    timestamps: true,
  }
);

const purchase = mongoose.model("Purchase",purchaseSchema);
module.exports = purchase;