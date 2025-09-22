const express = require("express");
const AvailableControllers = require("../Controllers/available-controller");
const Router = express.Router();

Router.post("/", AvailableControllers.createDeliveryAvailable);
Router.get("/", AvailableControllers.listDeliveryAvailable);
Router.get("/:id", AvailableControllers.listDeliveryAvailableById);
Router.put("/:id" , AvailableControllers.UpdateDeliveryAvailable);


module.exports = Router;

