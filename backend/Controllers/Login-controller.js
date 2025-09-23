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
  Customer.findOne({ mail: mail }).then(async (user) => {
    if (user) {
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
            secure: false, // set true behind HTTPS
            maxAge: 2 * 60 * 60 * 1000, // 2 hours
          });
        } catch (e) {
          console.error("Failed to set auth cookie:", e?.message || e);
        }
        const { password: _pw, ...safeUser } = user.toObject
          ? user.toObject()
          : user;
        res.json({
          message: "Success",
          user: safeUser,
        });
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("No record exsisted");
    }
  });
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
