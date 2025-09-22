const mongoose = require("mongoose");

const orderDeliverySchema = mongoose.Schema({
        delivery:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Delivery',
            required: true
        },
        order:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true
        },
        status: {
            type: String,
            enum: ['Assigned', 'Complete'],
          }
    },
    {
        timestamps: true,
    }
);

const orderdelivery = mongoose.model("OrderDelivery", orderDeliverySchema);
module.exports = orderdelivery;