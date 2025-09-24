const express = require("express");
const loginemployeeController = require("../Controllers/Login-employee-controller");
const Router = express.Router();
const fileupload = require("../middleware/file-upload");
const { customLoginRateLimiter } = require("../utils/rateLimiter");

Router.post("/", customLoginRateLimiter, loginemployeeController.EmployeeLogin);

module.exports = Router;
