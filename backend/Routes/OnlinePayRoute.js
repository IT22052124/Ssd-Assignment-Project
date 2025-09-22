const express = require("express");
const CardControllers = require("../Controllers/online_pay-controller");
const Router = express.Router();

Router.post("/onpay/new", CardControllers.OnlinePay);
Router.get("/list", CardControllers.listCard);
Router.delete("/:id", CardControllers.DeleteCard);
Router.get("/onpay/list/:uid", CardControllers.listCardByUId);
Router.get("/onpay/card/:id", CardControllers.listCardById);
Router.put("/onpay/:id", CardControllers.UpdateCard);
module.exports = Router;
