const express = require("express");
const rateLimit = require("express-rate-limit");
const { googleEmployeeAuth } = require("../Controllers/EmployeeGoogleAuthController");

const Router = express.Router();

// Throttle abuse (10 requests per minute per IP)
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

Router.post("/", limiter, googleEmployeeAuth);

module.exports = Router;