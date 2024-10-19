const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId }; // Make sure this matches the payload in your login route
    next();
  } catch (error) {
    res.status(401).send({ message: 'Please authenticate' });
  }
};