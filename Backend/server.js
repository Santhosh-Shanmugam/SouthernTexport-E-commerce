require("dotenv").config(); // Load .env variables
const port = process.env.PORT || 4000;
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

app.use(express.json());
app.use(cors());
app.use("/images", express.static("upload/images"));
app.use(bodyParser.json());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

// Connect to MongoDB using .env
mongoose.connect(process.env.MONGO_URL);

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

// Updated Product Schema
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
            revImage:String,
            date: { type: Date, default: Date.now }
        }
    ],
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
});

const Product = mongoose.model("Product", productSchema);
//Rating
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

// Start Server
app.listen(port, (e) => {
    if (!e) {
        console.log("Server is running on port:" + port);
    } else {
        console.log("Error on MongoDB connection: " + e);
    }
});
