const Profit = require("../Models/ProfitModel");
const Cost = require("../Models/CostModel");


const listCost = async (req, res) => {
    try {
      const cost = await Cost.find({});
      return res.status(200).json(cost);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
};


const listProfit = async (req, res) => {
  try {
    const profit = await Profit.find({});
    return res.status(200).json(profit);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};


exports.listCost = listCost;
exports.listProfit = listProfit;