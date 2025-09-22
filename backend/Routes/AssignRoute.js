const express = require("express");
const DeliveryOrderControllers = require("../Controllers/assign-controllers");
const Router = express.Router();

Router.post("/", DeliveryOrderControllers.createOrderDelivery);
Router.get("/", DeliveryOrderControllers.listOrderDelivery);
Router.get("/getOrders/", DeliveryOrderControllers.listOrderDeliveryById);
Router.put("/:id" ,  DeliveryOrderControllers.UpdateOrderDelivery);
Router.get("/:id", DeliveryOrderControllers.listAssignedDeliveryById);
Router.get("/complete/:id", DeliveryOrderControllers.listAssignedDeliveryByIds);
Router.get("/completedCount/count", DeliveryOrderControllers.listAllCompletedDeliveries);


module.exports = Router;
 