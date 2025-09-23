const express = require("express");
const router = express.Router();

// Customer logout
router.post("/customer", (req, res) => {
  res.clearCookie("cust_access", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Successfully logged out" });
});

// Employee logout
router.post("/employee", (req, res) => {
  res.clearCookie("emp_access", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Successfully logged out" });
});

module.exports = router;
