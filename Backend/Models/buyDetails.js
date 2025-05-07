const mongoose = require('mongoose');

const buyDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true
  },
  productId: {
    type: Number,
    ref: 'Product',
    required: true
  },
  productSize: {
    type: String,
    required: true,
    enum: ['S', 'M', 'L', 'XL'],
  },
  selectCount: {
    type: Number,
    required: true,
    min: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BuyDetails', buyDetailsSchema);
