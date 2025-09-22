const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  subtotal: {
    type: Number,
    required: true
  },
  shippingFee: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  Method: {
    type: String,
    required: true
  },
  card_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    required: false
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  submissionDate: {
    type: Date,
    default: Date.now // Set default value to current date and time
  },
  
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);