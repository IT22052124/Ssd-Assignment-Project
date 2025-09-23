
module.exports = function authorize(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.employee) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (allowedRoles.length && !allowedRoles.includes(req.employee.role)) {
      return res.status(403).json({
        message:
          "Forbidden - You don't have permission to access this resource",
      });
    }

    next();
  };
};
