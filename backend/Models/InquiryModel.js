const mongoose = require("mongoose");

const inquirySchema = mongoose.Schema(
  {
    ID: {
      type: String,
      required: [true, "Please Enter faq ID"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, ""],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, "Please Enter the issue"],
      trim: true,
    },
    mail: {
      type: String,
      required: [true, "Please Enter the mail"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please Enter the solution"],
      trim:true,
    },
    type: {
      type: String,
      default: 0,
    },
    reply: {
      type: String,
      default: "We will respond soon",
    },
    status: {
      type: String,
      default: "Pending",
    },
    rating: {
      type: String,
      default: "-",
    },
    telephone: {
      type: Number,
      required: [true, "Please Enter the Telephone Number"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const inquiry = mongoose.model("inquiry",inquirySchema);
module.exports = inquiry;
