const rateLimit = require("express-rate-limit");

const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: message, // This allows us to pass a custom response object
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // Store to track failed attempts by IP address
    skipSuccessfulRequests: true, // Only count failed requests
  });
};

// Specific rate limiters
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

module.exports = {
  loginRateLimiter,
  apiRateLimiter,
};
