const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride'); // Make sure this path is correct
const auth = require('../middleware/auth'); // Assuming you have an auth middleware

// Book a ride
router.post('/book', auth, async (req, res) => {
  try {
    const { pickup, destination } = req.body;
    const userId = req.user.id; // Get userId from the authenticated user

    console.log('Booking ride:', { pickup, destination, userId });

    const ride = new Ride({
      userId,
      pickup,
      destination
    });

    await ride.save();
    res.status(201).json(ride);
  } catch (error) {
    console.error('Error booking ride:', error);
    res.status(500).json({ message: 'Failed to book ride', error: error.message });
  }
});

// Get ride history
router.get('/history', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('Fetching ride history for user:', userId);
    const rides = await Ride.find({ userId }).sort({ date: -1 });
    console.log('Rides found:', rides);
    res.json(rides);
  } catch (error) {
    console.error('Error fetching ride history:', error);
    res.status(500).json({ message: 'Failed to fetch ride history', error: error.message });
  }
});
module.exports = router;