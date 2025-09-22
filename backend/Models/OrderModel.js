const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId:{
    type: String, 
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Customer",
    required: true
  },
  CartItems:[
    {
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  
}
],

time: {
  type: String,
  required: true
},

date:{ 
  type: String,
  required: true
}
  
},
{
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;