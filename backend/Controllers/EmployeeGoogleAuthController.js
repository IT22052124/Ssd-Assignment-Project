const { OAuth2Client } = require("google-auth-library");
const EmployeeLogin = require("../Models/EmployeeLoginModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST /auth/google/employee/signup
// Body: { idToken }
const googleEmployeeSignup = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: "idToken is required" });
    }

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload?.email;
    const nameFromGoogle = payload?.name;
    const picture = payload?.picture; // Google profile image URL

    if (!email) {
      return res.status(401).json({ message: "Invalid Google token payload" });
    }

    // If already exists, prevent duplicate signup
    const existing = await EmployeeLogin.findOne({ username: email });
    if (existing) {
      return res.status(409).json({
        message: "Employee already exists. Please sign in with Google.",
      });
    }

    // Generate sequential ID like P0001 (matching your existing pattern)
    const latestEmployee = await EmployeeLogin.find()
      .sort({ _id: -1 })
      .limit(1);
    let nextId;
    if (latestEmployee.length !== 0 && latestEmployee[0].ID) {
      const latestNum = parseInt(String(latestEmployee[0].ID).slice(1));
      nextId =
        "P" +
        String((Number.isNaN(latestNum) ? 0 : latestNum) + 1).padStart(4, "0");
    } else {
      nextId = "P0001";
    }

    // Create a random password (we'll store a bcrypt hash to satisfy schema; UI will use Google)
    const randomPassword = crypto.randomBytes(16).toString("hex");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(randomPassword, salt);

    // Default role = Admin (per your request). Note: your login controller treats anything not "Cashier" as admin.
    const employee = await EmployeeLogin.create({
      ID: nextId,
      name: nameFromGoogle || email.split("@")[0],
      role: "Admin",
      username: email,
      password: hashedPassword,
      avatarUrl: picture,
    });

    // Respond in the same shape your frontend expects
    return res.json({
      message: "admin",
      employeeId: employee._id,
      avatarUrl: employee.avatarUrl || picture || null,
    });
  } catch (err) {
    console.error("Google signup error:", err?.message || err);
    return res.status(401).json({ message: "Invalid Google token" });
  }
};

const googleEmployeeAuth = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: "idToken is required" });
    }

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload?.email;
    const picture = payload?.picture; // Google profile image URL

    if (!email) {
      return res.status(401).json({ message: "Invalid Google token payload" });
    }

    // Match employee by email (stored as username in your app)
    const employee = await EmployeeLogin.findOne({ username: email });

    if (!employee) {
      return res.status(401).json({ message: "Employee not found" });
    }

    // If user signed in before we stored avatars, persist the Google picture now
    if (picture && (!employee.avatarUrl || employee.avatarUrl !== picture)) {
      try {
        employee.avatarUrl = picture;
        await employee.save();
      } catch (e) {
        console.warn(
          "Failed to persist avatarUrl on Google sign-in:",
          e?.message || e
        );
      }
    }

    // Mirror your existing login response shape
    if (employee.role === "Cashier") {
      return res.json({
        message: "cashier",
        employeeId: employee._id,
        avatarUrl: employee.avatarUrl || picture || null,
      });
    } else {
      return res.json({
        message: "admin",
        employeeId: employee._id,
        avatarUrl: employee.avatarUrl || picture || null,
      });
    }
  } catch (err) {
    console.error("Google auth error:", err?.message || err);
    return res.status(401).json({ message: "Invalid Google token" });
  }
};

module.exports = { googleEmployeeAuth, googleEmployeeSignup };
