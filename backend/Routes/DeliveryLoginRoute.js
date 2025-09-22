const express = require("express");
const DeliveryLoginControllers = require("../Controllers/deliveryLogin-controllers");
const Router = express.Router();

Router.post("/",  DeliveryLoginControllers.createDeliveryLogin);
Router.get("/", DeliveryLoginControllers.listDeliveryLogin);
Router.get("/:id", DeliveryLoginControllers.listDeliveryLoginById);
Router.put("/:id" ,  DeliveryLoginControllers.UpdateDeliveryLogin);

module.exports = Router;
