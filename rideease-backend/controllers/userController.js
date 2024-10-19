const User = require('../models/User');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, phone },
      { new: true, runValidators: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    next(error);
  }
};