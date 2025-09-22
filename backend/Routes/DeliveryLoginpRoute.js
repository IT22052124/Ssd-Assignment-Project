const express = require("express");
const deliverypersoncontroller  = require("../Controllers/deliverypersoncontroller")
const Router = express.Router();
const fileupload = require('../middleware/file-upload')

Router.post("/",  deliverypersoncontroller.DeliveryPersonLogin);


module.exports = Router;