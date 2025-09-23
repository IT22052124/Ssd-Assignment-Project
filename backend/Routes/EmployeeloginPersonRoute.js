const express = require("express");
const loginemployeeController = require("../Controllers/Login-employee-controller");
const Router = express.Router();
const fileupload = require("../middleware/file-upload");
const { loginRateLimiter } = require("../utils/rateLimiter");
const customLoginRateLimiter = (req, res, next) => {
  loginRateLimiter(req, res, (err) => {
    if (err) {
      return res.status(429).json({
        error: true,
        message: "Too many login attempts, please try again after 15 minutes"
      });
    }
    next();
  });
};

Router.post("/", customLoginRateLimiter, loginemployeeController.EmployeeLogin);

module.exports = Router;
