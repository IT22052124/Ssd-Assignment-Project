// CSRF protection middleware setup
const csurf = require("csurf");

// Use cookie-based CSRF tokens for APIs
const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  },
});

module.exports = csrfProtection;
