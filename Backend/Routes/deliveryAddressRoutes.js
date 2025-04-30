const express = require('express');
const router = express.Router();
const { addDeliveryAddress } = require('../Controllers/addDeliveryAddress');

// POST route to add delivery address
router.post('/add', addDeliveryAddress);

module.exports = router;
