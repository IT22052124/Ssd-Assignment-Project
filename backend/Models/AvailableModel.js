const mongoose = require('mongoose');

const deliveryAvailableSchema = new mongoose.Schema({
    delivery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Delivery',
      required:true
    },
    available: {
      type: String,
      enum: ['Yes', 'No'],
      required: true
    }
  });
  
  const DeliveryAvailable = mongoose.model('DeliveryAvailable', deliveryAvailableSchema);
  
  module.exports = DeliveryAvailable;