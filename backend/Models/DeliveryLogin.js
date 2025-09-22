const mongoose = require("mongoose");

const deliveryLoginSchema = mongoose.Schema(
  {
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Delivery',
      
    },
    username: {
      type: String,
      required: [true, "Please Enter a Name"],
      trim: true,
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
        trim: true,
      } 
  },
  {
    timestamps: true,
  }
);

const deliverylogin = mongoose.model("DeliveryLogin",deliveryLoginSchema);
module.exports = deliverylogin;
