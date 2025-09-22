const DeliveryAvailable = require("../Models/AvailableModel");
const HttpError = require("../Models/http-error");
const Delivery  = require("../Models/DeliveryModel");
const DeliveryLogin = require("../Models/DeliveryLogin");
const uuid = require("uuid");
const fs = require("fs");

const createDeliveryAvailable = async (req, res, next) => {
  try {
    const { delivery, available } = req.body;
    console.log("Request Body:", req.body);

    const newDeliveryAvailable = {
      delivery: delivery, // Ensure that deliveryId is correctly assigned here
      available: available,
    };

    console.log("New Delivery Available:", newDeliveryAvailable);

    const createdDelivery = await DeliveryAvailable.create(newDeliveryAvailable);
    return res.status(201).send(createdDelivery);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const listDeliveryAvailable = async (req, res) => {
  try {
    const delivery = await DeliveryAvailable.find({available:"Yes"}).populate("delivery");
    return res.status(200).json(delivery);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const listDeliveryAvailableById = async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await DeliveryAvailable.find({delivery:id}).populate("delivery");

    return res.status(200).json(delivery);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateDeliveryAvailable = async (req, res) => {
  try {
    const { id } = req.params;

    const {available} = req.body;

    const UpdatedeliveryAvailable = {
        available:available,
  
    };
  
    const result = await DeliveryAvailable.findByIdAndUpdate(id, UpdatedeliveryAvailable);

    if (!result) {
      return res.status(404).send({ message: "Delivery Person Not Found !" });
    }

    return res.status(200).send({ message: "Delivery Person Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};



exports.createDeliveryAvailable = createDeliveryAvailable;
exports.listDeliveryAvailable= listDeliveryAvailable;
exports.listDeliveryAvailableById  = listDeliveryAvailableById;
exports.UpdateDeliveryAvailable = UpdateDeliveryAvailable;
