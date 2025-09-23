const express = require("express");
const rateLimit = require("express-rate-limit");
const {
  googleCustomerAuth,
} = require("../Controllers/CustomerGoogleAuthController");

const Router = express.Router();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

Router.post("/", limiter, googleCustomerAuth);

module.exports = Router;
