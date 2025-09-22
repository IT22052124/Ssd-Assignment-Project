const mongoose = require('mongoose');

const ProductReviewsSchema = new mongoose.Schema({
  PRid:{
    type: String, 
    required: true
  },
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  ProductID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  Rating: {
    type: Number,
    required: true
  },
  Message: {
    type: String,
    required: false
  }
},
{
  timestamps: true,
});

const ProductReviews = mongoose.model('ProductReviews', ProductReviewsSchema);

module.exports = ProductReviews;