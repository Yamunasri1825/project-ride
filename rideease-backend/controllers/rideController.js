const Ride = require('../models/Ride');

exports.bookRide = async (req, res, next) => {
  try {
    const { pickup, destination } = req.body;
    const ride = new Ride({
      user: req.user._id,
      pickup,
      destination,
    });
    await ride.save();
    res.status(201).json(ride);
  } catch (error) {
    next(error);
  }
};

exports.getRideHistory = async (req, res, next) => {
  try {
    const rides = await Ride.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(rides);
  } catch (error) {
    next(error);
  }
};

exports.getRideDetails = async (req, res, next) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    res.json(ride);
  } catch (error) {
    next(error);
  }
};