const express = require("express");
const EmployeeLoginControllers = require("../Controllers/employeeLogin-controllers");
const Router = express.Router();


Router.post("/new", EmployeeLoginControllers.createEmployeeLogin);
Router.get("/", EmployeeLoginControllers.listEmployeeLogin);
Router.get("/update/:id", EmployeeLoginControllers.listEmployeeLoginById);
Router.delete("/:id", EmployeeLoginControllers.DeleteEmployeeLogin);
Router.put("/update/:id", EmployeeLoginControllers.UpdateEmployeeLogin);



module.exports = Router;
