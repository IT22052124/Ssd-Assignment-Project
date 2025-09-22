const mongoose = require('mongoose');


const offpay = mongoose.Schema(
  {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    
    image: {
      type: Object,
      default: {},
    },
    submissionDate: {
      type: Date,
      default: Date.now // Set default value to current date and time
    },
  },
  {
    timestamps: true,
  }
);

const image = mongoose.model("Offline_Payment",offpay);
module.exports = image;




