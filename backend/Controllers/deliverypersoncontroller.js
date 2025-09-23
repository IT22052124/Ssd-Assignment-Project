const HttpError = require("../Models/http-error");
const DeliveryPerson = require("../Models/DeliveryLogin");
const bcrypt = require("bcryptjs");

const DeliveryPersonLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const deliveryPerson = await DeliveryPerson.findOne({
      username: username,
    }).populate("delivery");
    let passOk = false;
    if (deliveryPerson) {
      try {
        passOk = await bcrypt.compare(password, deliveryPerson.password);
      } catch (e) {
        passOk = false;
      }
    }
    if (deliveryPerson && passOk) {
      res.json({
        message: "Success",
        delivery: deliveryPerson.delivery._id,
      });
    } else {
      res.status(401).json("Invalid username/password");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Unable to process request, please try again later");
  }
};

exports.DeliveryPersonLogin = DeliveryPersonLogin;
