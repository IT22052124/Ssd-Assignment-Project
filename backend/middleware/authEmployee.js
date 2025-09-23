const jwt = require("jsonwebtoken");

module.exports = function authEmployee(req, res, next) {
  try {
    const token =
      req.cookies?.emp_access ||
      (req.headers.authorization || "").replace(/^Bearer\s+/i, "");

    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const secret = process.env.JWT_SECRET || "dev_secret_change_me";
    const decoded = jwt.verify(token, secret);

    req.employee = {
      id: decoded.sub,
      username: decoded.username,
      role: decoded.role, // Include role for role-based access control
    };

    return next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
