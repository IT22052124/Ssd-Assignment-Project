const express = require("express");
const rateLimit = require("express-rate-limit");
const { googleEmployeeSignup } = require("../Controllers/EmployeeGoogleAuthController");

const Router = express.Router();

// Throttle to prevent abuse (10 reqs/min/IP)
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

Router.post("/", limiter, googleEmployeeSignup);

module.exports = Router;