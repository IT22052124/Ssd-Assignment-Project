const express = require("express");
const CustomerControllers = require("../Controllers/customer-controllers");
const Router = express.Router();
const fileupload = require('../middleware/file-upload')

Router.post("/",fileupload.single('image'), CustomerControllers.createCustomer);
Router.get("/", CustomerControllers.listCustomer);
Router.delete("/:id", CustomerControllers.DeleteCustomer);
Router.get("/:id", CustomerControllers.listCustomerById);
Router.put("/:id", CustomerControllers.UpdateCustomer);
Router.get("/Top/Customers", CustomerControllers.getTopCustomersThisMonth);


module.exports = Router;
