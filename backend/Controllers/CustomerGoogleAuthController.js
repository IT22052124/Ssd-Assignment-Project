const { OAuth2Client } = require("google-auth-library");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Customer = require("../Models/CustomerModel");
const jwt = require("jsonwebtoken");
const signCustomerToken = (cust) => {
  const payload = { sub: String(cust._id), mail: cust.mail };
  const secret = process.env.JWT_SECRET || "dev_secret_change_me";
  return jwt.sign(payload, secret, { expiresIn: "2h" });
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST /auth/google/customer/signup
// Body: { idToken }
const googleCustomerSignup = async (req, res) => {
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
    const existing = await Customer.findOne({ mail: email });
    if (existing) {
      return res.status(409).json({
        message: "Customer already exists. Please sign in with Google.",
      });
    }

    // Generate sequential ID like C0001
    const latestCustomer = await Customer.find().sort({ _id: -1 }).limit(1);
    let nextId;
    if (latestCustomer.length !== 0 && latestCustomer[0].ID) {
      const latestNum = parseInt(String(latestCustomer[0].ID).slice(1));
      nextId =
        "C" +
        String((Number.isNaN(latestNum) ? 0 : latestNum) + 1).padStart(4, "0");
    } else {
      nextId = "C0001";
    }

    // Create a random password to satisfy schema (UI will use Google)
    const randomPassword = crypto.randomBytes(16).toString("hex");
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    // Minimal placeholders for required fields
    const customer = await Customer.create({
      ID: nextId,
      name: nameFromGoogle || email.split("@")[0],
      telephone: 0,
      mail: email,
      address: "N/A",
      city: "N/A",
      password: hashedPassword,
      image: picture || "uploads/images/No-Image-Placeholder.png",
    });

    // Return in the same shape your login page expects
    const safe = await Customer.findById(customer._id).select("-password");
    try {
      const token = signCustomerToken(safe);
      res.cookie("cust_access", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 2 * 60 * 60 * 1000,
      });
    } catch (e) {}
    return res.json({ message: "Success", user: safe });
  } catch (err) {
    console.error("Google customer signup error:", err?.message || err);
    return res.status(401).json({ message: "Invalid Google token" });
  }
};

// POST /auth/google/customer
// Body: { idToken }
const googleCustomerAuth = async (req, res) => {
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
    const picture = payload?.picture;

    if (!email) {
      return res.status(401).json({ message: "Invalid Google token payload" });
    }

    const customer = await Customer.findOne({ mail: email });
    if (!customer) {
      return res.status(401).json({ message: "Customer not found" });
    }

    // Backfill Google picture into image if empty or placeholder
    if (
      picture &&
      (!customer.image ||
        customer.image === "uploads/images/No-Image-Placeholder.png")
    ) {
      try {
        customer.image = picture;
        await customer.save();
      } catch (e) {
        console.warn(
          "Failed to persist customer image on Google sign-in:",
          e?.message || e
        );
      }
    }

    const safe = await Customer.findById(customer._id).select("-password");
    try {
      const token = signCustomerToken(safe);
      res.cookie("cust_access", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 2 * 60 * 60 * 1000,
      });
    } catch (e) {}
    return res.json({ message: "Success", user: safe });
  } catch (err) {
    console.error("Google customer auth error:", err?.message || err);
    return res.status(401).json({ message: "Invalid Google token" });
  }
};

module.exports = { googleCustomerAuth, googleCustomerSignup };
