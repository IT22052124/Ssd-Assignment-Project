const express = require("express");
const CustomerControllers = require("../Controllers/customer-controllers");
const authCustomer = require("../middleware/authCustomer");
const Router = express.Router();
const fileupload = require("../middleware/file-upload");

Router.post(
  "/",
  fileupload.single("image"),
  CustomerControllers.createCustomer
);
Router.post(
  "/",
  fileupload.single("image"),
  fileupload.checkMagic,
  CustomerControllers.createCustomer
);
Router.get("/", CustomerControllers.listCustomer);
Router.delete("/:id", authCustomer, CustomerControllers.DeleteCustomer);
Router.get("/:id", authCustomer, CustomerControllers.listCustomerById);
Router.put("/:id", authCustomer, CustomerControllers.UpdateCustomer);
Router.get("/Top/Customers", CustomerControllers.getTopCustomersThisMonth);

module.exports = Router;
