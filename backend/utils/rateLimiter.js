const rateLimit = require("express-rate-limit");

const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: message, 
    standardHeaders: true, 
    legacyHeaders: false, 
    // Store to track failed attempts by IP address
    skipSuccessfulRequests: true, 
  });
};

const loginRateLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes window
  5, // 5 attempts per window
  { message: "Too many login attempts, please try again after 15 minutes" }
);

// For API calls
const apiRateLimiter = createRateLimiter(
  60 * 1000, // 1 minute window
  30, // 30 requests per minute
  "Too many requests, please try again later"
);

const customLoginRateLimiter = (req, res, next) => {
  loginRateLimiter(req, res, (err) => {
    if (err) {
      return res.status(429).json({
        error: true,
        message: "Too many login attempts, please try again after 15 minutes",
      });
    }
    next();
  });
};

module.exports = {
  loginRateLimiter,
  apiRateLimiter,
  customLoginRateLimiter,
};
