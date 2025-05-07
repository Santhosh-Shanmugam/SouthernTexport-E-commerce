const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  id: Number,
  image1: String,
  image2: String,
  image3: String,
  name: String,
  old_price: Number,
  new_price: Number,
  category: String,
  offer: String,
  color: String,
  fabric: String,
  delivery: String,
  full_name: String,
  rating: Number,
  size_options: [String],
  product_count: { type: Number, default: 0 },
  product_status: String,
  description: String,
  reviews: [
    {
      user: String,
      rating: Number,
      comment: String,
      revImage: String,
      date: { type: Date, default: Date.now }
    }
  ],
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true }
});

// Create Product Model
const Product = mongoose.model("Product", productSchema);
module.exports = Product;