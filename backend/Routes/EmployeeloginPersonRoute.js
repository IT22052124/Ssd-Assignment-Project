const express = require("express");
const loginemployeeController  = require("../Controllers/Login-employee-controller")
const Router = express.Router();
const fileupload = require('../middleware/file-upload')

Router.post("/",  loginemployeeController.EmployeeLogin);


module.exports = Router;