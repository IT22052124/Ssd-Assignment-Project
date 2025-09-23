const HttpError = require("../Models/http-error");
const Delivery = require("../Models/DeliveryModel");
const DeliveryLogin = require("../Models/DeliveryLogin");
const uuid = require("uuid");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const createDeliveryLogin = async (req, res, next) => {
  try {
    const { deliveryId, username, password } = req.body;
    if (typeof username !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "Invalid username/password" });
    }
    const hash = await bcrypt.hash(password, 12);
    const newDeliveryLogin = {
      delivery: deliveryId,
      username: username,
      password: hash,
    };
    const delivery = await DeliveryLogin.create(newDeliveryLogin);
    return res
      .status(201)
      .send({
        _id: delivery._id,
        delivery: delivery.delivery,
        username: delivery.username,
      });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Unable to create delivery login" });
  }
};

const listDeliveryLogin = async (req, res) => {
  try {
    const delivery = await DeliveryLogin.find({}, { password: 0 });
    return res.status(200).json(delivery);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const listDeliveryLoginById = async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await DeliveryLogin.find(
      { delivery: id },
      { password: 0 }
    ).populate("delivery");

    return res.status(200).json(delivery);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateDeliveryLogin = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const update = {};
    if (typeof username === "string") update.username = username;
    if (typeof password === "string" && password.trim().length > 0) {
      update.password = await bcrypt.hash(password, 12);
    }
    const result = await DeliveryLogin.findByIdAndUpdate(id, { $set: update });

    if (!result) {
      return res.status(404).send({ message: "Delivery Person Not Found !" });
    }

    return res
      .status(200)
      .send({ message: "Delivery Person Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

exports.createDeliveryLogin = createDeliveryLogin;
exports.listDeliveryLogin = listDeliveryLogin;
exports.UpdateDeliveryLogin = UpdateDeliveryLogin;
exports.listDeliveryLoginById = listDeliveryLoginById;
