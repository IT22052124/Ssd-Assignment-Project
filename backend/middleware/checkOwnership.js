const Model = require(`../Models/${model}`);

module.exports = function checkOwnership(options) {
  return async (req, res, next) => {
    try {
      const { model, idParam, userField } = options;

      const resourceId = req.params[idParam];
      if (!resourceId) {
        return res.status(400).json({ message: "Resource ID not provided" });
      }

      let userId;
      if (req.customer) {
        userId = req.customer.id;
      } else if (req.employee) {
        // Admins can access any resource
        if (req.employee.role === "admin") {
          return next();
        }
        userId = req.employee.id;
      } else {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const resource = await Model.findById(resourceId);

      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }

      if (String(resource[userField]) !== String(userId)) {
        return res.status(403).json({
          message:
            "Forbidden - You don't have permission to access this resource",
        });
      }

      next();
    } catch (error) {
      console.error("Ownership check error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
