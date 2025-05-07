const BuyDetails = require('../Models/buyDetails');
const Product = require('../Models/productModels');

// Add item to buyDetails
exports.addToBuyDetails = async (req, res) => {
  try {
    const { userId, productId, productSize, selectCount } = req.body;

    const newItem = new BuyDetails({
      userId,
      productId,
      productSize,
      selectCount
    });

    const savedItem = await newItem.save();
    res.status(201).json({ success: true, data: savedItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all items for a user
exports.getUserBuyDetails = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Get BuyDetails items for the user
      const items = await BuyDetails.find({ userId })
        .sort({ createdAt: -1 });
  
      // Manually populate product data based on 'id' field
      for (let item of items) {
        const product = await Product.findOne({ id: item.productId }); // Match based on custom 'id'
        item.productDetails = product; // Attach the product details to each item
      }
  
      res.status(200).json({ success: true, data: items });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

// Update an item (e.g., size or count)
exports.updateBuyDetailsItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { productSize, selectCount } = req.body;

    const updatedItem = await BuyDetails.findByIdAndUpdate(
      id,
      { productSize, selectCount },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an item
exports.deleteBuyDetailsItem = async (req, res) => {
  try {
    const { id } = req.params;

    await BuyDetails.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Item removed from buyDetails' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
