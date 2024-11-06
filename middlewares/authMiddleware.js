const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) throw new Error();
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

const authorize = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).send({ error: "Access denied." });
  }
  next();
};

module.exports = { authenticate, authorize };
