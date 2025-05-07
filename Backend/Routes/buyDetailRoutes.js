const express = require('express');
const router = express.Router();
const buyDetailsController = require('../Controllers/buyDetailsController');

// POST - Add to buyDetails
router.post('/', buyDetailsController.addToBuyDetails);

// GET - Get all items for a user
router.get('/:userId', buyDetailsController.getUserBuyDetails);

// PUT - Update a specific item
router.put('/:id', buyDetailsController.updateBuyDetailsItem);

// DELETE - Delete a specific item
router.delete('/:id', buyDetailsController.deleteBuyDetailsItem);

module.exports = router;
