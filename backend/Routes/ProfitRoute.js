const express = require("express");
const ProfitControllers = require("../Controllers/profit-controllers");
const Router = express.Router();

Router.get("/cost", ProfitControllers.listCost);
Router.get("/profit", ProfitControllers.listProfit)


module.exports = Router;