const jwt = require("jsonwebtoken");

module.exports = function authCustomer(req, res, next) {
  try {
    const token =
      req.cookies?.cust_access ||
      (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
    if (!token) return res.status(401).json({ message: "Not authenticated" });
    const secret = process.env.JWT_SECRET || "dev_secret_change_me";
    const decoded = jwt.verify(token, secret);
    req.customer = { id: decoded.sub, mail: decoded.mail };
    return next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
