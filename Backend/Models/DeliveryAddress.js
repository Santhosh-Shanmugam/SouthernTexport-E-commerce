const mongoose = require('mongoose');

const deliveryAddressSchema = new mongoose.Schema({
    user_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'UserModel', 
      required: true 
    },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
  });
  
  const DeliveryAddress = mongoose.model('DeliveryAddress', deliveryAddressSchema);

  module.exports = DeliveryAddress;