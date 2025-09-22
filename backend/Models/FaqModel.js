const mongoose = require("mongoose");

const faqSchema = mongoose.Schema(
  {
    ID: {
      type: String,
      required: [true, "Please Enter faq ID"],
      trim: true,
    },
    issue: {
      type: String,
      required: [true, "Please Enter the issue"],
      trim: true,
    },
    solution: {
      type: String,
      required: [true, "Please Enter the solution"],
      trim:true,
    },
    likes: {
      type: Number,
      default : 0,
      },
    dislikes: {
      type: Number,
      default : 0,
      },
    category: {
      type: String,
      default: 0,
    },
    views: {
      type: Number,
      default : 0,
      },
    aurthor: {
      type: String,
      required: [true, "Please Enter your name"],
      trim:true,
    },
  },
  {
    timestamps: true,
  }
);

const faq = mongoose.model("faq",faqSchema);
module.exports = faq;
