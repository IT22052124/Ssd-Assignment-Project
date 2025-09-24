const HttpError = require("../Models/http-error");
const Customer = require("../Models/CustomerModel");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signCustomerToken = (cust) => {
  const payload = { sub: String(cust._id), mail: cust.mail };
  const secret = process.env.JWT_SECRET || "dev_secret_change_me";
  return jwt.sign(payload, secret, { expiresIn: "2h" });
};

const CustomerLogin = async (req, res) => {
  const { mail, password } = req.body;
  try {
    const user = await Customer.findOne({ mail: mail });

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    let passOk = false;
    try {
      passOk = await bcrypt.compare(password, user.password);
    } catch (e) {
      passOk = false;
    }

    if (passOk) {
      try {
        const token = signCustomerToken(user);
        res.cookie("cust_access", token, {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production", // secure in production
          maxAge: 2 * 60 * 60 * 1000, // 2 hours
        });

        const { password: _pw, ...safeUser } = user.toObject
          ? user.toObject()
          : user;

        return res.status(200).json({
          message: "Success",
          user: safeUser,
          token: token, // Include token in response
        });
      } catch (e) {
        console.error("Failed to set auth cookie:", e?.message || e);
        return res.status(500).json({
          error: "Authentication error",
        });
      }
    } else {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      error: "Server error, please try again later",
    });
  }
};

const CustomerLogout = (req, res) => {
  try {
    res.clearCookie("cust_access", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
  } catch (e) {
    // ignore
  }
  return res.json({ message: "Logged out" });
};

exports.CustomerLogin = CustomerLogin;
exports.CustomerLogout = CustomerLogout;
