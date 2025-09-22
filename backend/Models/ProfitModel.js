const { mongoose } = require("mongoose")

const profitSchema = mongoose.Schema(
    {
      order: {
        type: String,
        required: [true],
      },
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
      profit: {
        type: Number,
        required: [true],
        default: 0,
      },
      type: {
        type: String,
        enum: ['Online', 'Offline'],
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
  
  const profit = mongoose.model("Profit",profitSchema);
  module.exports = profit;