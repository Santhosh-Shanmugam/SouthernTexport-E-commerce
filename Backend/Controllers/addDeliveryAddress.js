const DeliveryAddress = require('../Models/DeliveryAddress');

exports.addDeliveryAddress = async (req, res) => {
  const { user_id,name, phone, email, address, city, zipcode} = req.body;

  const newAddress = new DeliveryAddress({
    user_id,
    name,
    phone,
    email,
    address,
    city,
    zipcode
  });

  try {
    // Save the address to the database
    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);  // Return saved address as response
  } catch (error) {
    res.status(500).json({ error: error.message });  // Handle errors
  }
};