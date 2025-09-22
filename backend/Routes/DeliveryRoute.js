const express = require("express");
const DeliveryControllers = require("../Controllers/delivery-controllers");
const Router = express.Router();
const fileupload = require("../middleware/file-upload");

Router.post("/", fileupload.single('image'),  DeliveryControllers.createDelivery);
Router.get("/", DeliveryControllers.listDelivery);
Router.delete("/:id", DeliveryControllers.DeleteDelivery);
Router.get("/:id", DeliveryControllers.listDeliveryById);
Router.put("/:id", fileupload.single('image') ,  DeliveryControllers.UpdateDelivery);



module.exports = Router;
