const HttpError = require("../Models/http-error");
const Customer = require("../Models/CustomerModel");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");

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
        res.json({
          message: "Success",
          user: user,
        });
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("No record exsisted");
    }
  });
};

exports.CustomerLogin = CustomerLogin;
