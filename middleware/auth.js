const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

const verifyRole = (req, res, next) => {
  if (req.user.role !== "SELLER")
    return res.status(403).json({ message: "Access Denied" });
  next();
};

module.exports = { verifyToken, verifyRole };
