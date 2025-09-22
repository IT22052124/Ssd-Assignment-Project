const express = require("express");
const LoginController = require("../Controllers/Login-controller")
const Router = express.Router();
const fileupload = require('../middleware/file-upload')

Router.post("/", LoginController.CustomerLogin);


module.exports = Router;