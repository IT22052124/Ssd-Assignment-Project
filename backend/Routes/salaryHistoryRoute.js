const express = require("express");
const Salarycontrollers = require("../Controllers/SalaryHistory-controllers");
const Router = express.Router();

Router.post("/new", Salarycontrollers.createSalaryHistory);
Router.get("/",Salarycontrollers.listSalaryHistory );

module.exports = Router;
