const express = require("express");
const EmployeeControllers = require("../Controllers/employee-controllers");
const Router = express.Router();

Router.post("/new", EmployeeControllers.createEmployee);
Router.get("/", EmployeeControllers.listEmployee);
Router.get("/:id", EmployeeControllers.listEmployeeById);
Router.delete("/:id", EmployeeControllers.DeleteEmployee);
Router.get("/update/:id", EmployeeControllers.listEmployeeById);
Router.get("/salaryform/:id", EmployeeControllers.listEmployeeById);
Router.put("/update/:id", EmployeeControllers.UpdateEmployee);
Router.get("/ids", EmployeeControllers.getIds);


module.exports = Router;
