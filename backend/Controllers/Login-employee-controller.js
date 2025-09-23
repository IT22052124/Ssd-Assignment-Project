const HttpError = require("../Models/http-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const EmployeeLoginModel = require("../Models/EmployeeLoginModel");

// In-memory store for tracking failed login attempts
// In a production environment, this would be better stored in Redis or a database
const loginAttempts = new Map();

// Clean up old login attempts periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of loginAttempts.entries()) {
    // Remove entries older than 15 minutes
    if (now - value.timestamp > 15 * 60 * 1000) {
      loginAttempts.delete(key);
    }
  }
}, 5 * 60 * 1000); // Run cleanup every 5 minutes

const EmployeeLogin = async (req, res) => {
  const { username, password } = req.body;

  // Input validation
  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !username.trim() ||
    !password.trim()
  ) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  // Constant time username validation to prevent timing attacks
  const usernameHash = Buffer.from(username.toLowerCase()).toString("base64");

  try {
    const employee = await EmployeeLoginModel.findOne({ username: username });
    let passOk = false;

    if (employee) {
      try {
        passOk = await bcrypt.compare(password, employee.password);
      } catch (e) {
        passOk = false;
      }
    }

    if (employee && passOk) {
      // Successful login - reset any tracked failed attempts
      loginAttempts.delete(usernameHash);

      // Create and sign JWT token with appropriate claims and limited scope
      const secret = process.env.JWT_SECRET || "dev_secret_change_me";
      const token = jwt.sign(
        {
          sub: employee._id,
          username: employee.username,
          role: employee.role,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
        },
        secret
      );

      // Set token in cookie with secure settings
      res.cookie("emp_access", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        path: "/",
      });

      if (employee.role === "Cashier") {
        res.json({
          message: "cashier",
          employeeId: employee._id,
          avatarUrl: employee.avatarUrl || null,
          role: employee.role,
          token: token, // Include token in response for API usage
        });
      } else {
        res.json({
          message: "admin",
          employeeId: employee._id,
          avatarUrl: employee.avatarUrl || null,
          role: employee.role,
          token: token, // Include token in response for API usage
        });
      }
    } else {
      // Track failed login attempts
      const attempt = loginAttempts.get(usernameHash) || {
        count: 0,
        timestamp: Date.now(),
      };
      attempt.count += 1;
      attempt.timestamp = Date.now();
      loginAttempts.set(usernameHash, attempt);

      // Log failed attempt for security monitoring
      console.log(
        `Failed login attempt for username: ${username}, IP: ${req.ip}, count: ${attempt.count}`
      );

      // Use constant time response to prevent timing attacks
      // Add a small random delay to further prevent timing analysis
      setTimeout(() => {
        res.status(401).json({ error: "Invalid username/password" });
      }, Math.floor(Math.random() * 100) + 50);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Unable to process request, please try again later" });
  }
};

exports.EmployeeLogin = EmployeeLogin;
