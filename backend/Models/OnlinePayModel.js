const mongoose = require('mongoose');

const OnlinePay = mongoose.Schema(
  {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    id: {
      type: String,
      required: [true, "Please Enter a id"],
      trim: true,
    },
    firstname: {
      type: String,
      required: [true, "Please Enter a first name"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Please Enter a last name"],
    },
    cvv: {
      type: String,
      required: [true, "Please Enter a cvv"],
    },
    category: {
      type: String,
      required: [true, "Please Enter a category"],
      trim: true,
    },
    expiredate: {
      type: String,
      required: [true, "Please Enter a expire date"],
    },
    number: {
      type: String,
      required: false,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Online', OnlinePay);