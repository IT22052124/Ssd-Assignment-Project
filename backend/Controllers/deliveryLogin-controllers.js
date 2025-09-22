const HttpError = require("../Models/http-error");
const Delivery  = require("../Models/DeliveryModel");
const DeliveryLogin = require("../Models/DeliveryLogin");
const uuid = require("uuid");
const fs = require("fs");

const createDeliveryLogin = async (req, res, next) => {
  const { deliveryId ,username , password } = req.body;

  
  const newDeliveryLogin = {
    delivery: deliveryId,
    username: username,
    password: password,
  };

  const delivery = await DeliveryLogin.create(newDeliveryLogin);
  return res.status(201).send(delivery);
};

const listDeliveryLogin = async (req, res) => {
  try {
    const delivery = await DeliveryLogin.find({});
    return res.status(200).json(delivery);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const listDeliveryLoginById = async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await DeliveryLogin.find({delivery:id}).populate("delivery");

    return res.status(200).json(delivery);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateDeliveryLogin = async (req, res) => {
  try {
    const { id } = req.params;

    const { username , password} = req.body;

    const UpdatedeliveryLogin = {
        username: username,
        password: password,
    };
  
    const result = await DeliveryLogin.findByIdAndUpdate(id, UpdatedeliveryLogin);

    if (!result) {
      return res.status(404).send({ message: "Delivery Person Not Found !" });
    }

    return res.status(200).send({ message: "Delivery Person Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};



exports.createDeliveryLogin = createDeliveryLogin;
exports.listDeliveryLogin = listDeliveryLogin;
exports.UpdateDeliveryLogin = UpdateDeliveryLogin;
exports.listDeliveryLoginById = listDeliveryLoginById;
