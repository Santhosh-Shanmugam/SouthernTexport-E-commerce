require("dotenv").config(); // Load .env variables
const port = process.env.PORT || 4000;
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const DeliveryAddress = require('./Models/DeliveryAddress');
const BuyDetails = require('./Models/buyDetails');
const Product = require('./Models/productModels');
const AuthRouter = require('./Routes/AuthRouter');
const deliveryAddressRoutes = require('./Routes/deliveryAddressRoutes');
const buyDetailRoutes = require('./Routes/buyDetailRoutes')
const Schema = mongoose.Schema;
app.use(express.json());
app.use(cors());
app.use("/images", express.static("upload/images"));
app.use(bodyParser.json());
app.use('/auth', AuthRouter);
app.use('/api/delivery', deliveryAddressRoutes);
app.use('/api/buy_details', buyDetailRoutes);

// Connect to MongoDB using .env
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Root Route
app.get("/", (req, res) => {
  res.send("Express app is running");
  console.log("Express app is running");
});

// Image Upload Configuration
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// Image Upload Route
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }
  res.json({
    success: 1,
    image_url: `https://southerntexport-e-commerce.onrender.com/images/${req.file.filename}`
  });
});


// Required packages and setup remain the same above...

// Updated Cart Schema with better validation
const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  cartItems: [
    {
      productId: {
        type: String,
        required: true
      },
      productSize: {
        type: String,
        required: true
      },
      selectCount: {
        type: Number,
        default: 1,
        min: 1
      }
    }
  ]
});

const CartModel = mongoose.model('Cart', cartSchema);
// Improved backend route for /addcart

app.post('/addcart', async (req, res) => {
  console.log("Received cart data:", req.body);

  const { userId, cartItems } = req.body;

  // Input validation
  if (!userId || !Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Missing or invalid userId or cartItems"
    });
  }

  // Validate each cart item
  for (let item of cartItems) {
    if (!item.productId || !item.productSize || !item.selectCount || item.selectCount < 1) {
      return res.status(400).json({
        success: false,
        message: "Each cart item must have valid productId, productSize and selectCount (min 1)"
      });
    }
  }

  try {
    // Find or create cart for this user
    let cart = await CartModel.findOne({ userId });

    if (cart) {
      // If cart exists, completely replace with the new items
      // This ensures we have exactly what's in the frontend state
      cart.cartItems = cartItems;
    } else {
      // If no cart exists, create a new one
      cart = new CartModel({ userId, cartItems });
    }

    await cart.save();
    console.log("Cart updated:", cart);

    res.json({
      success: true,
      message: "Cart updated successfully",
      cart
    });
  } catch (err) {
    console.error("Error saving cart:", err);
    res.status(500).json({
      success: false,
      message: "Failed to save cart",
      error: err.message
    });
  }
});
app.get('/getcart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res.json({ success: true, cart: { userId, cartItems: [] } });
    }

    res.json({ success: true, cart });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ success: false, message: "Failed to fetch cart" });
  }
});

// Update or create cart
app.post('/updatecart', async (req, res) => {
  try {
    const { userId, cartItems } = req.body;
    
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
    
    // Find and update, or create if doesn't exist (upsert)
    const updatedCart = await CartModel.findOneAndUpdate(
      { userId },
      { userId, cartItems },
      { new: true, upsert: true }
    );
    
    res.json({ success: true, cart: updatedCart });
  } catch (err) {
    console.error("Error updating cart:", err);
    res.status(500).json({ success: false, message: "Failed to update cart" });
  }
});

// Clear cart for a specific user
app.delete('/clearcart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    await CartModel.findOneAndDelete({ userId });
    res.json({ success: true, message: "Cart cleared successfully" });
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).json({ success: false, message: "Failed to clear cart" });
  }
});
// Rating
app.post("/product/:id/review", upload.single("image"), async (req, res) => {
  const productId = Number(req.params.id);
  const { rating, comment } = req.body;

  const parsedRating = parseFloat(rating);

  if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
    return res.status(400).json({
      success: false,
      message: "Rating must be a number between 1 and 5",
    });
  }

  const review = {
    user: req.body.user || "Anonymous",
    rating: parsedRating,
    comment,
    revImage: req.file ? `https://southerntexport-e-commerce.onrender.com/images/${req.file.filename}` : ""
  };

  try {
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.reviews.push(review);

    const validReviews = product.reviews.filter(item => {
      const reviewRating = parseFloat(item.rating);
      return !isNaN(reviewRating) && reviewRating >= 1 && reviewRating <= 5;
    });

    if (validReviews.length > 0) {
      const totalRating = validReviews.reduce((sum, item) => sum + parseFloat(item.rating), 0);

      const average = totalRating / validReviews.length;

      product.rating = Math.round(Math.min(5, Math.max(1, average)) * 10) / 10;

      console.log({
        validReviewsCount: validReviews.length,
        totalRating,
        average,
        finalRating: product.rating
      });
    } else {
      product.rating = 0;
    }

    await product.save();
    res.json({
      success: true,
      product,
      review
    });
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({
      success: false,
      message: "Error adding review",
    });
  }
});

// Add Product
app.post('/addproduct', async (req, res) => {
  console.log("Received product data:", req.body);

  let products = await Product.find({});
  let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  try {
    const product = new Product({ id, ...req.body });
    await product.save();
    console.log("Product saved:", product);
    res.json({ success: true, product });
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(500).json({ success: false, message: "Failed to save product", error: err });
  }
});

// Remove Product
app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Product removed");
  res.json({ success: true, name: req.body.name });
});

// Get All Products
app.get('/allproducts', async (req, res) => {
  let products = await Product.find({});
  console.log("All products retrieved from database");
  res.send(products);
});



//-----

app.get('/carts', async (req, res) => {
    let cartsitem = await CartModel.find({});
    console.log("All products retrieved from database");
    res.send(cartsitem);
});

app.get('/delivery', async (req, res) => {
    let deliveryadd = await DeliveryAddress.find({});
    console.log("All products retrieved from database");
    res.send(deliveryadd);
});

app.get('/buydetails', async (req, res) => {
    let buying = await BuyDetails.find({});
    console.log("All products retrieved from database");
    res.send(buying);
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server is running on port: " + port);
  } else {
    console.log("Error starting server: " + error);
  }
});


module.exports = Product;
