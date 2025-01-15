const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.token !== token) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user; // Attach user data to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Token verification failed" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Access denied, not an admin" });
  }
};

module.exports = { protect, admin }; // Export both protect and admin
